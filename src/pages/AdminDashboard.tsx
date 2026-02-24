import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LogOut, RefreshCw, Plus, Pencil, Trash2, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProducts, type DBProduct } from "@/hooks/useProducts";
import { useCollections, useCategories } from "@/hooks/useCollectionsCategories";
import { useArticles, type DBArticle } from "@/hooks/useArticles";
import AdminProductForm from "@/components/AdminProductForm";
import AdminArticleForm from "@/components/AdminArticleForm";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string | null;
  order_notes: string | null;
  items: any;
  total_price: number;
  created_at: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [expandedInquiry, setExpandedInquiry] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<DBProduct | null | undefined>(undefined);
  const [editingArticle, setEditingArticle] = useState<DBArticle | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'product' | 'collection' | 'category' | 'article'; id: string; name: string } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: products = [], refetch: refetchProducts } = useProducts();
  const { data: collections = [], refetch: refetchCollections } = useCollections();
  const { data: categories = [], refetch: refetchCategories } = useCategories();
  const { data: articlesList = [], refetch: refetchArticles } = useArticles();

  const fetchData = async () => {
    setLoading(true);
    const [ordersRes, inquiriesRes] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
    ]);
    if (ordersRes.data) setOrders(ordersRes.data);
    if (inquiriesRes.data) setInquiries(inquiriesRes.data);
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate("/admin/login");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin/login");
      } else {
        fetchData();
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    let error;
    if (deleteTarget.type === 'product') {
      ({ error } = await supabase.from("products").delete().eq("id", deleteTarget.id));
      if (!error) refetchProducts();
    } else if (deleteTarget.type === 'collection') {
      ({ error } = await supabase.from("collections").delete().eq("id", deleteTarget.id));
      if (!error) refetchCollections();
    } else if (deleteTarget.type === 'category') {
      ({ error } = await supabase.from("categories").delete().eq("id", deleteTarget.id));
      if (!error) refetchCategories();
    } else if (deleteTarget.type === 'article') {
      ({ error } = await supabase.from("articles").delete().eq("id", deleteTarget.id));
      if (!error) refetchArticles();
    }
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: `${deleteTarget.type.charAt(0).toUpperCase() + deleteTarget.type.slice(1)} deleted` });
    }
    setDeleteTarget(null);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
    });

  if (editingArticle !== undefined) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">
            {editingArticle ? "Edit Article" : "New Article"}
          </h1>
        </header>
        <main className="p-6 max-w-7xl mx-auto">
          <AdminArticleForm
            article={editingArticle}
            onSaved={() => { setEditingArticle(undefined); refetchArticles(); }}
            onCancel={() => setEditingArticle(undefined)}
          />
        </main>
      </div>
    );
  }

  if (editingProduct !== undefined) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">
            {editingProduct ? "Edit Product" : "New Product"}
          </h1>
        </header>
        <main className="p-6 max-w-7xl mx-auto">
          <AdminProductForm
            product={editingProduct}
            onSaved={() => { setEditingProduct(undefined); refetchProducts(); }}
            onCancel={() => setEditingProduct(undefined)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => { fetchData(); refetchProducts(); refetchCollections(); refetchCategories(); refetchArticles(); }} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
            <TabsTrigger value="collections">Collections ({collections.length})</TabsTrigger>
            <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
            <TabsTrigger value="orders">Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries ({inquiries.length})</TabsTrigger>
            <TabsTrigger value="articles">Articles ({articlesList.length})</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="mt-4">
            <div className="flex justify-end mb-4">
              <Button size="sm" onClick={() => setEditingProduct(null)}>
                <Plus className="h-4 w-4 mr-1" /> Add Product
              </Button>
            </div>
            {products.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">No products yet.</p>
            ) : (
              <div className="border rounded-lg overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Collection</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>
                          {p.images?.[0] ? (
                            <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded" />
                          ) : (
                            <div className="w-12 h-12 bg-muted rounded" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell>{p.collection}</TableCell>
                        <TableCell>{p.category}</TableCell>
                        <TableCell className="text-right">GH₵{Number(p.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        <TableCell>{p.featured ? "✓" : ""}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => setEditingProduct(p)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setDeleteTarget({ type: 'product', id: p.id, name: p.name })}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* Collections Tab */}
          <TabsContent value="collections" className="mt-4">
            {collections.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">No collections yet.</p>
            ) : (
              <div className="border rounded-lg overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {collections.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell className="text-muted-foreground">{c.slug}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={async () => {
                              const { error } = await supabase
                                .from("collections")
                                .update({ featured: !c.featured })
                                .eq("id", c.id);
                              if (error) {
                                toast({ title: "Error", description: error.message, variant: "destructive" });
                              } else {
                                refetchCollections();
                              }
                            }}
                          >
                            {c.featured ? "✓" : "—"}
                          </Button>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{formatDate(c.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => setDeleteTarget({ type: 'collection', id: c.id, name: c.name })}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="mt-4">
            {categories.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">No categories yet.</p>
            ) : (
              <div className="border rounded-lg overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Collection</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {collections.find(col => col.id === c.collection_id)?.name || '—'}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{c.slug}</TableCell>
                        <TableCell className="whitespace-nowrap">{formatDate(c.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => setDeleteTarget({ type: 'category', id: c.id, name: c.name })}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-4">
            {orders.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">No orders yet.</p>
            ) : (
              <div className="border rounded-lg overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8"></TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => {
                      const isExpanded = expandedOrder === order.id;
                      const items = Array.isArray(order.items) ? order.items : [];
                      return (
                        <>
                          <TableRow
                            key={order.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                          >
                            <TableCell>
                              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                            </TableCell>
                            <TableCell className="whitespace-nowrap">{formatDate(order.created_at)}</TableCell>
                            <TableCell className="font-medium">{order.customer_name}</TableCell>
                            <TableCell>{order.customer_email}</TableCell>
                            <TableCell className="text-right font-medium">GH₵{order.total_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                          </TableRow>
                          {isExpanded && (
                            <TableRow key={`${order.id}-detail`}>
                              <TableCell colSpan={5} className="bg-muted/30 p-0">
                                <div className="px-6 py-4 space-y-4">
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                      <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Customer</p>
                                      <p className="font-medium">{order.customer_name}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Email</p>
                                      <a href={`mailto:${order.customer_email}`} className="font-medium underline">{order.customer_email}</a>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Phone</p>
                                      <p className="font-medium">{order.customer_phone || "—"}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Shipping Address</p>
                                      <p className="font-medium whitespace-pre-line">{order.shipping_address || "—"}</p>
                                    </div>
                                  </div>
                                  {order.order_notes && (
                                    <div>
                                      <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Order Notes</p>
                                      <p className="text-sm whitespace-pre-line">{order.order_notes}</p>
                                    </div>
                                  )}
                                  {items.length > 0 && (
                                    <div>
                                      <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Items</p>
                                      <div className="border rounded-md overflow-hidden">
                                        <Table>
                                          <TableHeader>
                                            <TableRow>
                                              <TableHead>Product</TableHead>
                                              <TableHead className="text-right">Qty</TableHead>
                                              <TableHead className="text-right">Price</TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                            {items.map((item: any, idx: number) => (
                                              <TableRow key={idx}>
                                                <TableCell className="font-medium">{item.name || item.product_name || "Item"}</TableCell>
                                                <TableCell className="text-right">{item.quantity || 1}</TableCell>
                                                <TableCell className="text-right">GH₵{Number(item.price || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="mt-4">
            {inquiries.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">No inquiries yet.</p>
            ) : (
              <div className="border rounded-lg overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8"></TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Subject</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.map((inq) => {
                      const isExpanded = expandedInquiry === inq.id;
                      return (
                        <>
                          <TableRow
                            key={inq.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setExpandedInquiry(isExpanded ? null : inq.id)}
                          >
                            <TableCell>
                              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                            </TableCell>
                            <TableCell className="whitespace-nowrap">{formatDate(inq.created_at)}</TableCell>
                            <TableCell className="font-medium">{inq.name}</TableCell>
                            <TableCell>{inq.email}</TableCell>
                            <TableCell>{inq.subject || "—"}</TableCell>
                          </TableRow>
                          {isExpanded && (
                            <TableRow key={`${inq.id}-detail`}>
                              <TableCell colSpan={5} className="bg-muted/30 p-0">
                                <div className="px-6 py-4 space-y-3">
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                      <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Name</p>
                                      <p className="font-medium">{inq.name}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Email</p>
                                      <a href={`mailto:${inq.email}`} className="font-medium underline">{inq.email}</a>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Phone</p>
                                      <p className="font-medium">{inq.phone || "—"}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Subject</p>
                                      <p className="font-medium">{inq.subject || "—"}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Message</p>
                                    <p className="text-sm whitespace-pre-line leading-relaxed">{inq.message}</p>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles" className="mt-4">
            <div className="flex justify-end mb-4">
              <Button size="sm" onClick={() => setEditingArticle(null)}>
                <Plus className="h-4 w-4 mr-1" /> Add Article
              </Button>
            </div>
            {articlesList.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">No articles yet.</p>
            ) : (
              <div className="border rounded-lg overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Published</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articlesList.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell>
                          {a.image_url ? (
                            <img src={a.image_url} alt={a.title} className="w-12 h-12 object-cover rounded" />
                          ) : (
                            <div className="w-12 h-12 bg-muted rounded" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{a.title}</TableCell>
                        <TableCell>{a.category}</TableCell>
                        <TableCell>{a.author}</TableCell>
                        <TableCell className="whitespace-nowrap">{a.published_at}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => setEditingArticle(a)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setDeleteTarget({ type: 'article', id: a.id, name: a.title })}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{deleteTarget?.name}"?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
