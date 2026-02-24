import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart,
} from "recharts";
import { Package, ShoppingCart, DollarSign, TrendingUp, Users, FileText } from "lucide-react";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  items: any;
  total_price: number;
  created_at: string;
  order_status: string;
}

interface Inquiry {
  id: string;
  created_at: string;
}

interface AdminAnalyticsProps {
  orders: Order[];
  inquiries: Inquiry[];
  productsCount: number;
  articlesCount: number;
}

const COLORS = [
  "hsl(32, 35%, 45%)",   // accent/bronze
  "hsl(38, 50%, 55%)",   // highlight/gold
  "hsl(30, 8%, 15%)",    // primary/charcoal
  "hsl(35, 20%, 70%)",   // sand
  "hsl(0, 84%, 60%)",    // destructive
];

const AdminAnalytics = ({ orders, inquiries, productsCount, articlesCount }: AdminAnalyticsProps) => {
  const totalRevenue = useMemo(() => orders.reduce((sum, o) => sum + Number(o.total_price), 0), [orders]);

  const avgOrderValue = useMemo(() => orders.length > 0 ? totalRevenue / orders.length : 0, [totalRevenue, orders.length]);

  // Revenue by month (last 6 months)
  const revenueByMonth = useMemo(() => {
    const months: Record<string, number> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      months[key] = 0;
    }
    orders.forEach((o) => {
      const d = new Date(o.created_at);
      const key = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      if (key in months) months[key] += Number(o.total_price);
    });
    return Object.entries(months).map(([month, revenue]) => ({ month, revenue }));
  }, [orders]);

  // Orders by status
  const ordersByStatus = useMemo(() => {
    const counts: Record<string, number> = { confirmed: 0, procurement: 0, production: 0, shipping: 0, delivered: 0 };
    orders.forEach((o) => {
      if (o.order_status in counts) counts[o.order_status]++;
      else counts[o.order_status] = (counts[o.order_status] || 0) + 1;
    });
    return Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
      }));
  }, [orders]);

  // Orders per month
  const ordersPerMonth = useMemo(() => {
    const months: Record<string, number> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      months[key] = 0;
    }
    orders.forEach((o) => {
      const d = new Date(o.created_at);
      const key = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      if (key in months) months[key]++;
    });
    return Object.entries(months).map(([month, count]) => ({ month, count }));
  }, [orders]);

  // Inquiries per month
  const inquiriesPerMonth = useMemo(() => {
    const months: Record<string, number> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      months[key] = 0;
    }
    inquiries.forEach((inq) => {
      const d = new Date(inq.created_at);
      const key = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      if (key in months) months[key]++;
    });
    return Object.entries(months).map(([month, count]) => ({ month, count }));
  }, [inquiries]);

  const formatCurrency = (v: number) => `GH₵${v.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  const kpis = [
    { title: "Total Revenue", value: formatCurrency(totalRevenue), icon: DollarSign, accent: true },
    { title: "Total Orders", value: orders.length.toString(), icon: ShoppingCart },
    { title: "Avg Order Value", value: formatCurrency(avgOrderValue), icon: TrendingUp },
    { title: "Inquiries", value: inquiries.length.toString(), icon: Users },
    { title: "Products", value: productsCount.toString(), icon: Package },
    { title: "Articles", value: articlesCount.toString(), icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className={kpi.accent ? "border-accent/30 bg-accent/5" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{kpi.title}</p>
              </div>
              <p className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
                {kpi.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium" style={{ fontFamily: "var(--font-sans)" }}>
              Revenue (Last 6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueByMonth}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(32, 35%, 45%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(32, 35%, 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 20%, 85%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(30, 8%, 45%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(30, 8%, 45%)" tickFormatter={(v) => `₵${v / 1000}k`} />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                    contentStyle={{ borderRadius: 0, border: "1px solid hsl(35, 20%, 85%)", fontSize: 12 }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(32, 35%, 45%)" fill="url(#revenueGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Order Status Pie */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium" style={{ fontFamily: "var(--font-sans)" }}>
              Orders by Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              {ordersByStatus.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center pt-20">No orders yet</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ordersByStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, value }) => `${name} (${value})`}
                    >
                      {ordersByStatus.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 0, border: "1px solid hsl(35, 20%, 85%)", fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Orders per Month */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium" style={{ fontFamily: "var(--font-sans)" }}>
              Orders per Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersPerMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 20%, 85%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(30, 8%, 45%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(30, 8%, 45%)" allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: 0, border: "1px solid hsl(35, 20%, 85%)", fontSize: 12 }} />
                  <Bar dataKey="count" fill="hsl(30, 8%, 15%)" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Inquiries per Month */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium" style={{ fontFamily: "var(--font-sans)" }}>
              Inquiries per Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={inquiriesPerMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 20%, 85%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(30, 8%, 45%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(30, 8%, 45%)" allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: 0, border: "1px solid hsl(35, 20%, 85%)", fontSize: 12 }} />
                  <Line type="monotone" dataKey="count" stroke="hsl(38, 50%, 55%)" strokeWidth={2} dot={{ fill: "hsl(38, 50%, 55%)", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
