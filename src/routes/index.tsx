import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, Bell, HelpCircle, FileText, ChevronDown, BarChart3, Home, Building2, Box, Database,
  Trophy, FileX, FileMinus, Table2, Bookmark, Calendar, Filter, RefreshCw, ShoppingCart, Coins,
  ClipboardList, Package, Target, ArrowUp, ChevronRight, ChevronLeft, Info, AlertTriangle,
  TrendingDown, List, LayoutGrid, Download, Settings, ArrowRight,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Satış Raporları | İnşaatÇevrem ERP" },
      { name: "description", content: "Satış verilerinizi detaylı raporlarla analiz edin, karşılaştırın ve dışa aktarın." },
      { property: "og:title", content: "Satış Raporları | İnşaatÇevrem ERP" },
      { property: "og:description", content: "Satış verilerinizi detaylı raporlarla analiz edin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const tabs = [
  { l: "Günlük Satış", i: Home }, { l: "Aylık Satış", i: Building2 }, { l: "Ürün Performansı", i: Box },
  { l: "Kârlılık Analizi", i: Database }, { l: "Müşteri Performansı", i: Trophy },
  { l: "İptal Analizi", i: FileX }, { l: "İade Analizi", i: FileMinus },
];

const trend = (() => {
  const a = [17, 19, 21, 23, 25, 27, 29, 31, 33, 36, 39, 41, 40, 38, 38, 42, 47, 52, 56, 72.36, 60, 58, 60, 62, 64, 67, 72, 76, 81, 86, 91];
  const b = [12, 14, 16, 18, 20, 21, 23, 25, 27, 28, 30, 31, 30, 29, 29, 33, 37, 41, 44, 55.41, 46, 45, 47, 49, 50, 52, 56, 60, 64, 68, 72];
  return a.map((v, i) => ({ d: i + 1, bu: Math.round(v * 1000), on: Math.round((b[i] ?? 0) * 1000) }));
})();

const dist = [
  { n: "Kaba Yapı", v: 42.1, c: "var(--primary)" },
  { n: "İnce Yapı", v: 27.3, c: "var(--success)" },
  { n: "Tesisat", v: 12.6, c: "var(--warning)" },
  { n: "Boya & Yalıtım", v: 9.4, c: "var(--violet)" },
  { n: "Diğer", v: 8.6, c: "var(--gray-dot)" },
];

const rows = [
  ["Çimento 50 kg", "Kaba Yapı", "torba", "4.960", "₺248.000", "₺202.400", "₺45.600", "%18,4", "₺4.560", 126, "🧱"],
  ["İnşaat Demiri Ø12", "Kaba Yapı", "ton", "82,50", "₺182.500", "₺152.560", "₺29.940", "%16,9", "₺3.210", 98, "🔩"],
  ["Tuğla 19x13,5x8,5", "İnce Yapı", "palet", "120", "₺98.240", "₺76.500", "₺21.740", "%22,1", "₺2.180", 76, "🟧"],
  ["Alçı Sıva 25 kg", "İnce Yapı", "torba", "1.360", "₺76.300", "₺57.600", "₺18.700", "%24,5", "₺1.240", 54, "🛍️"],
  ["Yalıtım Levhası 5 cm", "Boya & Yalıtım", "m²", "2.880", "₺62.400", "₺45.660", "₺17.340", "%27,8", "₺890", 32, "📦"],
] as const;

const fmt = (n: number) => "₺" + n.toLocaleString("tr-TR");

function Sel({ label, value, icon }: { label: string; value: string; icon?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <button className="flex h-9 w-full items-center gap-2 rounded-md border border-input bg-card px-3 text-sm font-medium hover:border-primary">
        {icon && <Calendar className="h-4 w-4" />}
        <span className="flex-1 text-left">{value}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  );
}

function Kpi({ icon: I, tone, title, value, change, up, sub }: any) {
  const tones: Record<string, string> = {
    blue: "bg-info-soft text-primary", green: "bg-success-soft text-success", red: "bg-danger-soft text-danger",
    orange: "bg-warning-soft text-warning", indigo: "bg-accent text-primary",
  };
  return (
    <button className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left shadow-sm transition hover:shadow-md">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tones[tone]}`}><I className="h-6 w-6" /></div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${up ? "text-success" : "text-danger"}`}><ArrowUp className="h-4 w-4" />{change}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <ChevronRight className="h-5 w-5 text-foreground transition group-hover:translate-x-0.5" />
    </button>
  );
}

function Seg({ items, active, set, small }: { items: string[]; active: number; set: (i: number) => void; small?: boolean }) {
  return (
    <div className="flex rounded-full bg-muted p-1">
      {items.map((t, i) => (
        <button key={t} onClick={() => set(i)}
          className={`rounded-full ${small ? "px-4 py-1 text-xs" : "px-5 py-1.5 text-sm"} font-medium transition ${i === active ? "bg-info-soft font-semibold text-primary shadow-[inset_0_-2px_0_var(--primary)]" : "text-foreground hover:text-primary"}`}>
          {t}
        </button>
      ))}
    </div>
  );
}

function TrendTip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-lg">
      <div className="mb-1 font-semibold">{p.d} Eki 2026</div>
      <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" />Bu Ay: <b className="ml-auto">{fmt(p.bu)}</b></div>
      <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-gray-dot" />Önceki Ay: <b className="ml-auto">{fmt(p.on)}</b></div>
    </div>
  );
}

function Index() {
  const [tab, setTab] = useState(0);
  const [chartTab, setChartTab] = useState(0);
  const [detTab, setDetTab] = useState(0);
  const [view, setView] = useState(0);
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-8">
        <div className="relative w-[700px] max-w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <input placeholder="Ürün, müşteri, sipariş, sevkiyat, fatura ara... (Ctrl + K)" className="h-9 w-full rounded-md border border-input bg-card pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary" />
        </div>
        <div className="ml-auto flex items-center gap-5">
          <button className="relative"><Bell className="h-5 w-5" /><span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-danger" /></button>
          <HelpCircle className="h-5 w-5" />
          <button className="flex h-9 items-center gap-2 rounded-md border border-input px-3 text-sm font-semibold"><FileText className="h-4 w-4" />Merkez Şube<ChevronDown className="h-4 w-4" /></button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">AT</div>
        </div>
      </header>

      <main className="space-y-3 p-5">
        <div className="flex items-center gap-4 px-2">
          <BarChart3 className="h-11 w-11 text-primary" strokeWidth={2.5} />
          <div>
            <h1 className="text-2xl font-bold">Satış Raporları</h1>
            <p className="text-sm">Satış verilerinizi detaylı raporlarla analiz edin, karşılaştırın ve dışa aktarın.</p>
          </div>
        </div>

        <div className="flex items-center gap-1 border-b border-border">
          {tabs.map(({ l, i: I }, idx) => (
            <button key={l} onClick={() => setTab(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium ${idx === tab ? "rounded-t-md border-b-2 border-primary bg-info-soft font-semibold text-primary" : "hover:text-primary"}`}>
              <I className="h-4 w-4" />{l}
            </button>
          ))}
          <div className="ml-auto flex gap-2 pb-1">
            <button className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold"><Table2 className="h-4 w-4" />Rapor Oluştur</button>
            <button className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold"><Bookmark className="h-4 w-4" />Kaydedilmiş Görünümler</button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] items-end gap-4">
          <Sel label="Dönem" value="1 – 31 Eki 2026" icon /><Sel label="Şube" value="Tümü" /><Sel label="Kategori" value="Tümü" />
          <Sel label="Marka" value="Tümü" /><Sel label="Satış Temsilcisi" value="Tümü" />
          <div className="flex gap-2">
            <button className="flex h-9 items-center gap-2 rounded-md border border-input bg-card px-4 text-sm font-semibold"><Filter className="h-4 w-4 text-primary" />Gelişmiş Filtreler</button>
            <button className="flex h-9 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90"><Filter className="h-4 w-4" />Uygula</button>
            <button className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-card"><RefreshCw className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3">
          <Kpi icon={ShoppingCart} tone="blue" title="Net Satış" value="₺1.240.560" change="+%12,4" up sub="(Önceki Ay: ₺1.103.220)" />
          <Kpi icon={Coins} tone="green" title="Brüt Kâr" value="₺248.112" change="+%15,9" up sub={<>Kâr Marjı: <b className="text-success">%20,0</b></>} />
          <Kpi icon={ClipboardList} tone="indigo" title="Satış İşlemi" value="386" change="+%8,2" up sub="(Önceki Ay: 357)" />
          <Kpi icon={Package} tone="red" title="İade Tutarı" value="₺32.480" change="+%22,6" sub="(Önceki Ay: ₺26.460)" />
          <Kpi icon={Target} tone="orange" title="Ortalama Satış Tutarı" value="₺3.216" change="+%3,9" up sub="(Önceki Ay: ₺3.096)" />
        </div>

        <div className="grid grid-cols-[1.6fr_1fr_1.02fr] gap-3">
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Satış Trendi</h2>
              <Seg items={["Ciro (Net Satış)", "Brüt Kâr", "Satış Adedi"]} active={chartTab} set={setChartTab} />
            </div>
            <div className="h-[150px]">
              <ResponsiveContainer>
                <AreaChart data={trend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} /><stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} /></linearGradient></defs>
                  <CartesianGrid stroke="var(--border)" />
                  <XAxis dataKey="d" ticks={[1, 5, 10, 15, 20, 25, 31]} tickFormatter={(v) => `${v} Eki`} tick={{ fontSize: 12, fill: "var(--foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis ticks={[0, 20000, 40000, 60000, 80000, 100000]} domain={[0, 100000]} tickFormatter={(v) => v.toLocaleString("tr-TR")} tick={{ fontSize: 12, fill: "var(--foreground)" }} axisLine={false} tickLine={false} width={60} />
                  <Tooltip content={<TrendTip />} />
                  <Area type="monotone" dataKey="on" stroke="var(--gray-dot)" strokeWidth={2} fill="var(--muted)" fillOpacity={0.6} dot={false} />
                  <Area type="monotone" dataKey="bu" stroke="var(--primary)" strokeWidth={2.5} fill="url(#g)" dot={false} activeDot={{ r: 5, stroke: "var(--card)", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-primary" />Bu Ay</span>
              <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full border-2 border-gray-dot" />Önceki Ay</span>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <h2 className="flex items-center gap-2 text-base font-bold">Satış Dağılımı (Kategori) <Info className="h-4 w-4 text-muted-foreground" /></h2>
            <div className="mt-2 flex items-center gap-4">
              <div className="relative h-[170px] w-[170px] shrink-0">
                <ResponsiveContainer>
                  <PieChart><Pie data={dist} dataKey="v" innerRadius={62} outerRadius={84} startAngle={90} endAngle={-270} stroke="var(--card)" strokeWidth={2}>
                    {dist.map((d) => <Cell key={d.n} fill={d.c} />)}
                  </Pie></PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center"><b className="text-lg">₺1.240.560</b><span className="text-sm">Net Satış</span></div>
              </div>
              <ul className="flex-1 space-y-3 text-sm">
                {dist.map((d) => (
                  <li key={d.n} className="flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{ background: d.c }} />{d.n}<span className="ml-auto">{d.v.toLocaleString("tr-TR")}%</span></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
            <div className="mb-2 flex items-center gap-2 px-1">
              <AlertTriangle className="h-6 w-6 text-danger" />
              <h2 className="text-lg font-bold">Dikkat Gerektirenler</h2>
              <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-danger text-xs font-bold text-primary-foreground">3</span>
            </div>
            <div className="space-y-1.5">
              {[
                { I: TrendingDown, c: "bg-danger-soft text-danger", t: "Satışı düşen müşteriler", s: "3 müşteride %20'den fazla düşüş" },
                { I: Coins, c: "bg-warning-soft text-warning", t: "Düşük marjlı satışlar", s: "5 üründe marj %10'un altında" },
                { I: Box, c: "bg-info-soft text-primary", t: "Hızlı satan, stoğu az ürünler", s: "4 üründe stok kritik seviyede" },
              ].map(({ I, c, t, s }) => (
                <button key={t} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left ${c} hover:brightness-95`}>
                  <I className="h-7 w-7" />
                  <div className="flex-1 text-foreground"><div className="text-sm font-bold">{t}</div><div className="text-xs">{s}</div></div>
                  <ChevronRight className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-6">
            <h2 className="text-lg font-bold">Satış Detayı</h2>
            <Seg small items={["Ürün Bazlı", "Müşteri Bazlı", "Kategori Bazlı", "Şube Bazlı", "Temsilci Bazlı"]} active={detTab} set={setDetTab} />
            <div className="ml-auto flex items-center gap-2">
              <div className="flex gap-1">
                {[List, LayoutGrid].map((I, i) => (
                  <button key={i} onClick={() => setView(i)} className={`flex h-9 w-9 items-center justify-center rounded-md border ${view === i ? "border-primary bg-info-soft text-primary" : "border-input"}`}><I className="h-5 w-5" /></button>
                ))}
              </div>
              <button className="flex h-9 items-center gap-2 rounded-md border border-input px-4 text-sm font-semibold"><Download className="h-4 w-4" />Dışa Aktar<ChevronDown className="h-4 w-4" /></button>
              <button className="flex h-9 w-9 items-center justify-center rounded-md border border-input"><Settings className="h-4 w-4" /></button>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-muted text-foreground">
              <tr className="[&>th]:px-3 [&>th]:py-2.5 [&>th]:font-medium">
                <th className="w-12 text-center">#</th><th className="text-left">Ürün</th><th>Kategori</th><th>Birim</th>
                <th className="text-right">Miktar</th><th className="text-right">Net Satış</th><th className="text-right">Maliyet</th>
                <th className="text-right">Brüt Kâr</th><th>Marj</th><th className="text-right">İade Tutarı</th><th className="text-right">İşlem Sayısı</th><th />
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r[0]} className="border-b border-border hover:bg-muted/50 [&>td]:px-3 [&>td]:py-2">
                  <td className="text-center"><span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${i === 0 ? "bg-warning-soft text-danger" : ""}`}>{i + 1}</span></td>
                  <td className="font-semibold"><span className="mr-3 text-xl">{r[10]}</span>{r[0]}</td>
                  <td className="text-center"><span className="rounded-full bg-info-soft px-3 py-1 text-xs font-medium">{r[1]}</span></td>
                  <td className="text-center">{r[2]}</td>
                  <td className="text-right">{r[3]}</td><td className="text-right">{r[4]}</td><td className="text-right">{r[5]}</td><td className="text-right">{r[6]}</td>
                  <td className="text-center"><span className="rounded-full bg-success-soft px-2 py-1 text-xs font-semibold text-success">{r[7]}</span></td>
                  <td className="text-right">{r[8]}</td><td className="text-right">{r[9]}</td>
                  <td className="text-right"><button className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-input text-primary hover:bg-info-soft"><ArrowRight className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex items-center text-xs">
            <span>Toplam 5 kayıt (Tümünü görmek için filtreleri kullanabilirsiniz)</span>
            <div className="ml-auto flex items-center gap-2">
              <span>Satır:</span>
              <button className="flex h-8 items-center gap-3 rounded-md border border-input px-3">10<ChevronDown className="h-3 w-3" /></button>
              <button onClick={() => setPage(Math.max(1, page - 1))} className="flex h-8 w-8 items-center justify-center"><ChevronLeft className="h-4 w-4" /></button>
              {[1, 2, 3].map((n) => (
                <button key={n} onClick={() => setPage(n)} className={`h-8 w-8 rounded-md text-sm ${page === n ? "bg-primary text-primary-foreground" : ""}`}>{n}</button>
              ))}
              <span>…</span>
              <button onClick={() => setPage(24)} className={`h-8 w-8 rounded-md text-sm ${page === 24 ? "bg-primary text-primary-foreground" : ""}`}>24</button>
              <button onClick={() => setPage(Math.min(24, page + 1))} className="flex h-8 w-8 items-center justify-center rounded-md border border-input"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
