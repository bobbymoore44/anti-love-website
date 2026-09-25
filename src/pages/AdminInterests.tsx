import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminPasswordGate from "@/components/AdminPasswordGate";
import { Button } from "@/components/ui/button";
import { Download, Loader2, ArrowLeft, LogOut, Pencil, Trash2, FileText, FileSpreadsheet } from "lucide-react";
import { fetchCustomerInterests, updateCustomerInterest, deleteCustomerInterest, type CustomerInterest, fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";

type DateFilter = "all" | "today" | "seven" | "thirty" | "ninety";

const AdminInterests = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("antiLoveAdminAccess") === "true"
  );
  const navigate = useNavigate();
  const [interests, setInterests] = useState<CustomerInterest[]>([]);
  const [filteredInterests, setFilteredInterests] = useState<CustomerInterest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [productFilter, setProductFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [editingInterest, setEditingInterest] = useState<CustomerInterest | null>(null);
  const [deletingInterest, setDeletingInterest] = useState<CustomerInterest | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [productImages, setProductImages] = useState<Record<string, string>>({});
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadInterests();
    loadProductImages();
  }, []);

  useEffect(() => {
    filterInterests();
  }, [interests, searchTerm, productFilter, dateFilter]);

  const loadInterests = async () => {
    try {
      setIsLoading(true);
      const data = await fetchCustomerInterests();
      setInterests(data);
    } catch (error) {
      console.error("Error loading interests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadProductImages = async () => {
    try {
      const products = await fetchProducts(100);
      const imageMap: Record<string, string> = {};
      
      products.forEach((product: ShopifyProduct) => {
        const handle = product.node.handle;
        const imageUrl = product.node.images.edges[0]?.node.url;
        if (imageUrl) {
          imageMap[handle] = imageUrl;
        }
      });
      
      setProductImages(imageMap);
    } catch (error) {
      console.error("Error loading product images:", error);
    }
  };

  const filterInterests = () => {
    let filtered = [...interests];

    // Date filtering
    if (dateFilter !== "all") {
      const now = new Date();
      let cutoffDate: Date;

      switch (dateFilter) {
        case "today":
          cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case "seven":
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "thirty":
          cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case "ninety":
          cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        default:
          cutoffDate = new Date(0);
      }

      filtered = filtered.filter((interest) => {
        const createdAt = interest.createdAt ? new Date(interest.createdAt) : new Date(0);
        return createdAt >= cutoffDate;
      });
    }

    // Search filtering
    if (searchTerm) {
      filtered = filtered.filter(
        (interest) =>
          interest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          interest.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          interest.productTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Product filtering
    if (productFilter !== "all") {
      filtered = filtered.filter((interest) => interest.productHandle === productFilter);
    }

    setFilteredInterests(filtered);
  };

  const uniqueProducts = Array.from(
    new Set(interests.map((i) => i.productHandle))
  ).map((handle) => {
    const interest = interests.find((i) => i.productHandle === handle);
    return { handle, title: interest?.productTitle || handle };
  });

  // Analytics data
  const productAnalytics = Object.entries(
    interests.reduce((acc, interest) => {
      acc[interest.productTitle] = (acc[interest.productTitle] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const sizeAnalytics = Object.entries(
    interests
      .filter((i) => i.size)
      .reduce((acc, interest) => {
        acc[interest.size!] = (acc[interest.size!] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);


  const COLORS = ['#ffb3c6', '#ff8fab', '#fb6f92', '#ffccd5'];

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("antiLoveAdminAccess");
    setIsAuthenticated(false);
  };

  const handleEditInterest = (interest: CustomerInterest) => {
    setEditingInterest(interest);
  };

  const handleSaveEdit = async () => {
    if (!editingInterest) return;

    try {
      setIsSaving(true);
      await updateCustomerInterest(
        editingInterest.id,
        {
          email: editingInterest.email,
          firstName: editingInterest.firstName,
          productHandle: editingInterest.productHandle,
          productTitle: editingInterest.productTitle,
          productId: editingInterest.productId,
          styleCode: editingInterest.styleCode,
          size: editingInterest.size,
          colour: editingInterest.colour,
        }
      );
      
      toast.success("Interest updated successfully");
      setEditingInterest(null);
      await loadInterests();
    } catch (error) {
      console.error("Failed to update interest:", error);
      toast.error("Failed to update interest. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteInterest = (interest: CustomerInterest) => {
    setDeletingInterest(interest);
  };

  const confirmDelete = async () => {
    if (!deletingInterest) return;

    try {
      setIsSaving(true);
      await deleteCustomerInterest(deletingInterest.id);
      
      toast.success("Interest deleted successfully");
      setDeletingInterest(null);
      await loadInterests();
    } catch (error) {
      console.error("Failed to delete interest:", error);
      toast.error("Failed to delete interest. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const exportToExcel = () => {
    const data = filteredInterests.map(interest => ({
      Email: interest.email,
      "First Name": interest.firstName || "-",
      Product: interest.productTitle,
      Size: interest.size || "-",
      Date: interest.createdAt ? new Date(interest.createdAt).toLocaleDateString() : "-",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Interests");
    
    const date = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `interests-export-${date}.xlsx`);
    toast.success("Excel file downloaded successfully");
  };

  const exportToCSV = () => {
    const headers = ["Email", "Name", "Product", "Size", "Date"];
    const rows = filteredInterests.map((interest) => [
      interest.email,
      interest.firstName || "",
      interest.productTitle,
      interest.size || "",
      interest.createdAt || "",
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `creative-collection-interests-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const getDateFilterLabel = () => {
    switch (dateFilter) {
      case "today":
        return "Today";
      case "seven":
        return "Past 7 Days";
      case "thirty":
        return "Past 30 Days";
      case "ninety":
        return "Past 90 Days";
      default:
        return "All Time";
    }
  };

  const exportToPDF = async () => {
    if (!chartRef.current) return;
    
    try {
      setIsExportingPDF(true);
      toast.info("Generating PDF report...");

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;

      // Header
      pdf.setFontSize(24);
      pdf.setTextColor(233, 168, 178);
      pdf.text("Creative Collection Analytics", pageWidth / 2, yPosition, { align: "center" });
      
      yPosition += 10;
      pdf.setFontSize(12);
      pdf.setTextColor(160, 160, 168);
      pdf.text(`Report Period: ${getDateFilterLabel()}`, pageWidth / 2, yPosition, { align: "center" });
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition + 6, { align: "center" });

      yPosition += 20;

      // Summary Statistics
      pdf.setFontSize(16);
      pdf.setTextColor(255, 255, 255);
      pdf.text("Summary Statistics", 20, yPosition);
      
      yPosition += 10;
      pdf.setFontSize(11);
      pdf.setTextColor(200, 200, 200);
      
      const stats = [
        `Total Interests: ${filteredInterests.length}`,
        `Unique Products: ${uniqueProducts.length}`,
        `Top Product: ${productAnalytics[0]?.name || "N/A"} (${productAnalytics[0]?.value || 0} requests)`,
        `Most Popular Size: ${sizeAnalytics[0]?.name || "N/A"} (${sizeAnalytics[0]?.value || 0} requests)`
      ];

      stats.forEach((stat, index) => {
        pdf.text(stat, 25, yPosition + (index * 7));
      });

      yPosition += stats.length * 7 + 15;

      // Capture charts
      const chartElements = chartRef.current.querySelectorAll(".chart-card");
      
      for (let i = 0; i < chartElements.length; i++) {
        const element = chartElements[i] as HTMLElement;
        
        if (yPosition > pageHeight - 80) {
          pdf.addPage();
          yPosition = 20;
        }

        const canvas = await html2canvas(element, {
          backgroundColor: "#1a1a1a",
          scale: 2,
          logging: false,
        });

        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pageWidth - 40;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 20, yPosition, imgWidth, imgHeight);
        yPosition += imgHeight + 15;
      }

      // Add new page for table summary
      pdf.addPage();
      yPosition = 20;

      pdf.setFontSize(16);
      pdf.setTextColor(255, 255, 255);
      pdf.text("Recent Interests", 20, yPosition);
      
      yPosition += 10;

      // Table headers
      pdf.setFontSize(9);
      pdf.setTextColor(200, 200, 200);
      pdf.text("Email", 20, yPosition);
      pdf.text("Product", 80, yPosition);
      pdf.text("Size", 150, yPosition);
      pdf.text("Date", 170, yPosition);

      yPosition += 7;

      // Table rows (first 20)
      pdf.setFontSize(8);
      pdf.setTextColor(160, 160, 160);
      
      const displayInterests = filteredInterests.slice(0, 20);
      displayInterests.forEach((interest, index) => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.text(interest.email.substring(0, 25), 20, yPosition);
        pdf.text(interest.productTitle.substring(0, 30), 80, yPosition);
        pdf.text(interest.size || "-", 150, yPosition);
        pdf.text(
          interest.createdAt ? new Date(interest.createdAt).toLocaleDateString() : "-",
          170,
          yPosition
        );
        
        yPosition += 6;
      });

      if (filteredInterests.length > 20) {
        yPosition += 5;
        pdf.setTextColor(160, 160, 168);
        pdf.text(`...and ${filteredInterests.length - 20} more interests`, 20, yPosition);
      }

      // Footer
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(120, 120, 120);
        pdf.text(
          `Anti-Love Creative Collection | Page ${i} of ${totalPages}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
      }

      // Save PDF
      const fileName = `anti-love-analytics-${getDateFilterLabel().toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`;
      pdf.save(fileName);
      
      toast.success("PDF report generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF report");
    } finally {
      setIsExportingPDF(false);
    }
  };

  // Show password gate if not authenticated
  if (!isAuthenticated) {
    return <AdminPasswordGate onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-white drop-shadow-lg mb-2">
                Creative Collection Interests
              </h1>
              <p className="text-muted-foreground/80">
                View and export customer interest registrations
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={exportToPDF}
                disabled={filteredInterests.length === 0 || isExportingPDF}
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
              >
                {isExportingPDF ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Export PDF
                  </>
                )}
              </Button>

              <Button
                onClick={exportToExcel}
                disabled={filteredInterests.length === 0}
                variant="outline"
                className="border-white/10 hover:bg-white/5 text-foreground transition-all duration-300"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export Excel
              </Button>

              <Button
                onClick={exportToCSV}
                disabled={filteredInterests.length === 0}
                variant="outline"
                className="border-white/10 hover:bg-white/5 text-foreground transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-white/10 hover:bg-white/5 text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Date Filter Dropdown */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <Label className="text-white/80 text-sm font-medium whitespace-nowrap">Date Range:</Label>
              <Select value={dateFilter} onValueChange={(value: DateFilter) => setDateFilter(value)}>
                <SelectTrigger className="w-[200px] bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="seven">Past 7 Days</SelectItem>
                  <SelectItem value="thirty">Past 30 Days</SelectItem>
                  <SelectItem value="ninety">Past 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Most Requested Product Spotlight */}
          {!isLoading && filteredInterests.length > 0 && (() => {
            const productCounts = filteredInterests.reduce((acc, interest) => {
              acc[interest.productTitle] = (acc[interest.productTitle] || 0) + 1;
              return acc;
            }, {} as Record<string, number>);

            const topProduct = Object.entries(productCounts).sort((a, b) => b[1] - a[1])[0];
            
            if (!topProduct) return null;

            const [productTitle, count] = topProduct;
            const percentage = ((count / filteredInterests.length) * 100).toFixed(1);
            const productHandle = filteredInterests.find(i => i.productTitle === productTitle)?.productHandle;
            const productImage = productHandle ? productImages[productHandle] : null;

            return (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0">
                    {productImage ? (
                      <div className="flex items-center justify-center w-32 h-32 bg-white/5 border border-white/10 rounded-xl p-2">
                        <img
                          src={productImage}
                          alt={productTitle}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-32 w-32 rounded-xl bg-white/10" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-xs uppercase tracking-wider text-pink-300/80 font-medium">
                      Most Requested Product
                    </p>
                    <h3 className="text-2xl font-semibold text-white">
                      {productTitle}
                    </h3>
                    <div className="flex items-baseline gap-3">
                      <p className="text-4xl font-bold text-pink-300">
                        {count}
                      </p>
                      <p className="text-white/60 text-sm">
                        interests ({percentage}% of total)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg rounded-xl p-4 flex gap-3 mb-6 transition-all duration-300 hover:bg-white/10">
            <Input
              placeholder="Search by email, name, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md bg-white/5 border-white/10 text-foreground"
            />
            
            <Select value={productFilter} onValueChange={setProductFilter}>
              <SelectTrigger className="w-[250px] bg-white/5 border-white/10 text-foreground">
                <SelectValue placeholder="Filter by product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {uniqueProducts.map((product) => (
                  <SelectItem key={product.handle} value={product.handle}>
                    {product.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Analytics Charts */}
        {!isLoading && interests.length > 0 && (
          <div ref={chartRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="chart-card bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl transition-all duration-300 hover:bg-white/10">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">Top Requested Products</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart 
                    data={productAnalytics}
                    margin={{ bottom: 80, left: 20, right: 20, top: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="rgba(255,255,255,0.3)"
                      tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 11 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.3)" 
                      tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12 }}
                      axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(26, 26, 26, 0.95)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        color: '#fff',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                      }} 
                    />
                    <Bar dataKey="value" fill="#ffb3c6" name="Interests" radius={[8, 8, 0, 0]}>
                      <LabelList 
                        dataKey="value" 
                        position="top" 
                        fill="rgba(255,255,255,0.9)" 
                        fontSize={12}
                        fontWeight={600}
                      />
                      {productAnalytics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="chart-card bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl transition-all duration-300 hover:bg-white/10">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">Size Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sizeAnalytics}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={3}
                    >
                      {sizeAnalytics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(26, 26, 26, 0.95)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        color: '#fff',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredInterests.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              {searchTerm || productFilter !== "all"
                ? "No interests found matching your filters"
                : "No customer interests registered yet"}
            </p>
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/5 transition-all duration-300">
                  <TableHead className="text-foreground">Image</TableHead>
                  <TableHead className="text-foreground">Email</TableHead>
                  <TableHead className="text-foreground">Name</TableHead>
                  <TableHead className="text-foreground">Product</TableHead>
                  <TableHead className="text-foreground">Size</TableHead>
                  <TableHead className="text-foreground">Date</TableHead>
                  <TableHead className="text-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterests.map((interest, index) => {
                  const imageUrl = productImages[interest.productHandle];
                  
                  return (
                    <TableRow key={index} className="border-white/10 hover:bg-white/5 transition-all duration-300">
                      <TableCell className="text-foreground">
                        {imageUrl ? (
                          <div className="w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg p-2">
                            <img 
                              src={imageUrl} 
                              alt={interest.productTitle}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-white/10" />
                        )}
                      </TableCell>
                      <TableCell className="text-foreground">{interest.email}</TableCell>
                      <TableCell className="text-foreground">{interest.firstName || "-"}</TableCell>
                      <TableCell className="text-foreground">{interest.productTitle}</TableCell>
                      <TableCell className="text-foreground">{interest.size || "-"}</TableCell>
                      <TableCell className="text-foreground">
                        {interest.createdAt
                          ? new Date(interest.createdAt).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell className="text-foreground text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditInterest(interest)}
                            className="h-8 w-8 text-muted-foreground hover:text-foreground transition-all duration-300"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteInterest(interest)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive transition-all duration-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            
            <div className="px-6 py-4 border-t border-white/10">
              <p className="text-sm text-muted-foreground">
                Showing {filteredInterests.length} of {interests.length} total interests
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Edit Dialog */}
      <Dialog open={!!editingInterest} onOpenChange={(open) => !open && setEditingInterest(null)}>
        <DialogContent className="bg-background border-white/10">
          <DialogHeader>
            <DialogTitle className="text-foreground">Edit Customer Interest</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Update the details of this customer interest registration.
            </DialogDescription>
          </DialogHeader>
          
          {editingInterest && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  value={editingInterest.email}
                  onChange={(e) => setEditingInterest({ ...editingInterest, email: e.target.value })}
                  className="bg-white/5 border-white/10 text-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                <Input
                  id="firstName"
                  value={editingInterest.firstName || ""}
                  onChange={(e) => setEditingInterest({ ...editingInterest, firstName: e.target.value })}
                  className="bg-white/5 border-white/10 text-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="size" className="text-foreground">Size</Label>
                <Input
                  id="size"
                  value={editingInterest.size || ""}
                  onChange={(e) => setEditingInterest({ ...editingInterest, size: e.target.value })}
                  className="bg-white/5 border-white/10 text-foreground"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingInterest(null)}
              disabled={isSaving}
              className="border-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingInterest} onOpenChange={(open) => !open && setDeletingInterest(null)}>
        <AlertDialogContent className="bg-background border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Delete Customer Interest</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete this interest registration? This action cannot be undone.
              {deletingInterest && (
                <div className="mt-4 p-3 rounded bg-white/5 border border-white/10">
                  <p className="text-sm text-foreground">
                    <strong>Email:</strong> {deletingInterest.email}
                  </p>
                  <p className="text-sm text-foreground">
                    <strong>Product:</strong> {deletingInterest.productTitle}
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              disabled={isSaving}
              className="border-white/10"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isSaving}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminInterests;
