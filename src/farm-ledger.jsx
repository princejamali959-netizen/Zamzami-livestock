import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  Lock, Unlock, Plus, Trash2, Pencil, X, Check, Users, Wheat, Pill,
  Home as HomeIcon, Truck, MoreHorizontal, TrendingUp, TrendingDown,
  Wallet, Download, Settings as SettingsIcon, LayoutGrid, Receipt,
  PawPrint, ShieldCheck, Eye, Droplet, Zap, Car, Wrench, Scissors,
  Hammer, HeartHandshake, ShoppingBag, Sprout, Syringe, Languages
} from "lucide-react";

// ---------- translations ----------
const T = {
  en: {
    appTitle: "Farm Ledger",
    tabOverview: "Overview", tabTransactions: "Transactions", tabSalaries: "Salaries",
    tabLivestock: "Livestock", tabSettings: "Settings",
    ownerMode: "Owner mode", viewingOnly: "Viewing only", openingLedger: "Opening the ledger…",
    thisMonthIn: "This month · in", thisMonthOut: "This month · out", thisMonthNet: "This month · net", yearNet: "net",
    setupTitle: "Set up your owner PIN",
    setupDesc: "Only you should know this. Anyone with your link can view the ledger, but only this PIN unlocks editing.",
    createPinPh: "Create PIN (4+ digits)", confirmPinPh: "Confirm PIN",
    pinTooShort: "PIN must be at least 4 digits.", pinMismatch: "PINs don't match.",
    createLedgerBtn: "Create ledger",
    ownerLoginTitle: "Enter as owner", ownerLoginDesc: "Enter your PIN to add and edit records.",
    pinPh: "PIN", pinWrong: "Wrong PIN. Try again.",
    unlockOwnerBtn: "Unlock owner mode", continueViewerBtn: "Continue as viewer",
    memberLoginTitle: "Team member login", memberLoginDesc: "Sign in with the email and password the owner gave you.",
    emailPh: "Email", passwordPh: "Password", memberLoginBtn: "Sign in", loginWrong: "Email or password is incorrect.",
    manageAccessTitle: "Manage access", manageAccessDesc: "This shows everyone who currently has a login. To add, remove, or change someone, edit the USERS list near the top of farm-ledger.jsx and republish the site — the login list must live in the code so it works for every visitor.",
    addUserBtn: "Add person", userRoleLabel: "Access level", ownerRoleOpt: "Owner (full access)", viewerRoleOpt: "Viewer (read-only)",
    noUsersYet: "No one added yet.", removeUserBtn: "Remove",
    ownerPinModalTitle: "Owner PIN", unlockBtn: "Unlock",
    chart12moTitle: "Income vs expenses — last 12 months", netTrendTitle: "Net trend",
    whereMoneyWentTitle: "Where the money went", noExpensesFor: "No expenses logged for {month} yet.",
    recentActivityTitle: "Recent activity", nothingRecorded: "Nothing recorded yet.",
    addEditTitleEdit: "Edit entry", addEditTitleAdd: "Add income or expense",
    typeLabel: "Type", expenseOpt: "Expense", incomeOpt: "Income",
    categoryLabel: "Category", dateLabel: "Date", amountLabel: "Amount",
    noteLabel: "Note", noteOptionalPh: "Optional",
    saveChangesBtn: "Save changes", addEntryBtn: "Add entry", cancelBtn: "Cancel",
    allRecordsTitle: "All records", allOpt: "All", noRecordsMatch: "No records match.",
    colDate: "Date", colCategory: "Category", colNote: "Note", colAmount: "Amount",
    addWorkerTitle: "Add worker", nameLabel: "Name", roleLabel: "Role", rolePh: "Herder, Vet, etc.",
    monthlySalaryLabel: "Monthly salary", addBtn: "Add", teamTitle: "Team",
    noWorkersYet: "No workers added yet.", paidLabel: "Paid", markPaidBtn: "Mark paid",
    unpaidLabel: "Unpaid", perMonth: "/mo",
    noLivestockYet: "No livestock logged yet — add your first flock below.",
    logChangeTitle: "Log livestock change", speciesLabel: "Species", speciesPh: "Sheep, Goat…",
    changeLabel: "Change", countLabel: "Count", logBtn: "Log", livestockNotePh: "Note (optional)",
    livestockTip: "Tip: log the purchase price as an expense in the Transactions tab, and sales as income — this tab just tracks headcount.",
    historyTitle: "History", noHistoryYet: "Nothing logged yet.",
    actPurchase: "Purchased", actBirth: "Born", actSale: "Sold", actLoss: "Lost / Died",
    onlyOwnerSettings: "Settings can only be changed by the owner. Ask them to unlock owner mode.",
    currencyTitle: "Currency", changePinTitle: "Change owner PIN", newPinPh: "New PIN (4+ digits)",
    updateBtn: "Update", exportTitle: "Export", exportDesc: "Download every record as a JSON backup file.",
    exportBtn: "Export data", languageTitle: "Language",
    sharingTitle: "Sharing",
    sharingDesc: "Share this page's link with your team. Anyone who opens it can view the ledger. Only someone who enters your PIN can add, edit, or delete records.",
    catSalary: "Worker Salaries", catFeedRoughage: "Feed – Grass & Hay", catFeedConcentrate: "Feed – Grain & Protein",
    catMedicine: "Medicine & Vet Care", catBreeding: "Breeding & Vaccination", catWater: "Water Supply",
    catElectricity: "Electricity", catRent: "Rent & Land Lease", catTransport: "Transportation & Fuel",
    catVehicleMaint: "Vehicle Maintenance & Insurance", catEquipment: "Equipment & Tools",
    catShearing: "Shearing & Grooming", catInfrastructure: "Fencing & Infrastructure",
    catInsurance: "Farm Insurance", catLivestockPurchase: "Livestock Purchase", catOtherExpense: "Other Expenses",
    catLivestockSale: "Livestock Sales", catProductSale: "Milk, Wool & Products",
    catBreedingIncome: "Breeding / Stud Fees", catOtherIncome: "Other Income",
    footerRights: "All rights reserved.",
    footerConfidential: "Confidential financial records — internal use only.",
    idleLockedNotice: "Owner session locked after inactivity for security.",
  },
  ar: {
    appTitle: "سجل المزرعة",
    tabOverview: "نظرة عامة", tabTransactions: "المعاملات", tabSalaries: "الرواتب",
    tabLivestock: "المواشي", tabSettings: "الإعدادات",
    ownerMode: "وضع المالك", viewingOnly: "عرض فقط", openingLedger: "جاري فتح السجل…",
    thisMonthIn: "هذا الشهر · وارد", thisMonthOut: "هذا الشهر · صادر", thisMonthNet: "هذا الشهر · الصافي", yearNet: "الصافي",
    setupTitle: "إعداد رمز المالك السري",
    setupDesc: "يجب أن تعرف هذا الرمز أنت فقط. يمكن لأي شخص لديه الرابط عرض السجل، لكن هذا الرمز فقط يتيح التعديل.",
    createPinPh: "أنشئ رمزًا سريًا (٤ أرقام أو أكثر)", confirmPinPh: "أكّد الرمز السري",
    pinTooShort: "يجب أن يتكون الرمز من ٤ أرقام على الأقل.", pinMismatch: "الرمزان غير متطابقين.",
    createLedgerBtn: "إنشاء السجل",
    ownerLoginTitle: "الدخول كمالك", ownerLoginDesc: "أدخل رمزك السري لإضافة السجلات وتعديلها.",
    pinPh: "الرمز السري", pinWrong: "رمز خاطئ، حاول مرة أخرى.",
    unlockOwnerBtn: "فتح وضع المالك", continueViewerBtn: "المتابعة كمُشاهد",
    memberLoginTitle: "دخول عضو الفريق", memberLoginDesc: "سجّل الدخول بالبريد الإلكتروني وكلمة المرور اللذين أعطاك إياهما المالك.",
    emailPh: "البريد الإلكتروني", passwordPh: "كلمة المرور", memberLoginBtn: "تسجيل الدخول", loginWrong: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    manageAccessTitle: "إدارة الوصول", manageAccessDesc: "هذه القائمة تعرض كل من لديه دخول حاليًا. لإضافة أو إزالة أو تغيير شخص، عدّل قائمة USERS في أعلى ملف farm-ledger.jsx وأعد نشر الموقع — يجب أن تكون قائمة الدخول داخل الكود حتى تعمل لكل زائر.",
    addUserBtn: "إضافة شخص", userRoleLabel: "مستوى الوصول", ownerRoleOpt: "مالك (صلاحية كاملة)", viewerRoleOpt: "مُشاهد (عرض فقط)",
    noUsersYet: "لم تتم إضافة أحد بعد.", removeUserBtn: "إزالة",
    ownerPinModalTitle: "رمز المالك السري", unlockBtn: "فتح",
    chart12moTitle: "الدخل مقابل المصروفات — آخر ١٢ شهرًا", netTrendTitle: "اتجاه الصافي",
    whereMoneyWentTitle: "أين ذهبت الأموال", noExpensesFor: "لا توجد مصروفات مسجّلة لشهر {month} بعد.",
    recentActivityTitle: "النشاط الأخير", nothingRecorded: "لا يوجد شيء مسجّل بعد.",
    addEditTitleEdit: "تعديل الإدخال", addEditTitleAdd: "إضافة دخل أو مصروف",
    typeLabel: "النوع", expenseOpt: "مصروف", incomeOpt: "دخل",
    categoryLabel: "الفئة", dateLabel: "التاريخ", amountLabel: "المبلغ",
    noteLabel: "ملاحظة", noteOptionalPh: "اختياري",
    saveChangesBtn: "حفظ التغييرات", addEntryBtn: "إضافة إدخال", cancelBtn: "إلغاء",
    allRecordsTitle: "كل السجلات", allOpt: "الكل", noRecordsMatch: "لا توجد سجلات مطابقة.",
    colDate: "التاريخ", colCategory: "الفئة", colNote: "ملاحظة", colAmount: "المبلغ",
    addWorkerTitle: "إضافة عامل", nameLabel: "الاسم", roleLabel: "الوظيفة", rolePh: "راعٍ، طبيب بيطري، إلخ",
    monthlySalaryLabel: "الراتب الشهري", addBtn: "إضافة", teamTitle: "الفريق",
    noWorkersYet: "لم تتم إضافة عمال بعد.", paidLabel: "مدفوع", markPaidBtn: "تحديد كمدفوع",
    unpaidLabel: "غير مدفوع", perMonth: "/شهر",
    noLivestockYet: "لا توجد مواشٍ مسجّلة بعد — أضف قطيعك الأول أدناه.",
    logChangeTitle: "تسجيل تغيير في المواشي", speciesLabel: "النوع", speciesPh: "أغنام، ماعز…",
    changeLabel: "التغيير", countLabel: "العدد", logBtn: "تسجيل", livestockNotePh: "ملاحظة (اختياري)",
    livestockTip: "ملاحظة: سجّل سعر الشراء كمصروف في تبويب المعاملات، والمبيعات كدخل — هذا التبويب يتابع العدد فقط.",
    historyTitle: "السجل", noHistoryYet: "لا يوجد شيء مسجّل بعد.",
    actPurchase: "تم الشراء", actBirth: "ولادة", actSale: "تم البيع", actLoss: "نفوق / فقدان",
    onlyOwnerSettings: "الإعدادات يمكن تغييرها من قبل المالك فقط. اطلب منه فتح وضع المالك.",
    currencyTitle: "العملة", changePinTitle: "تغيير رمز المالك السري", newPinPh: "رمز سري جديد (٤ أرقام أو أكثر)",
    updateBtn: "تحديث", exportTitle: "تصدير", exportDesc: "تنزيل جميع السجلات كملف نسخة احتياطية JSON.",
    exportBtn: "تصدير البيانات", languageTitle: "اللغة",
    sharingTitle: "المشاركة",
    sharingDesc: "شارك رابط هذه الصفحة مع فريقك. يمكن لأي شخص يفتحه مشاهدة السجل. فقط من يدخل رمزك السري يمكنه إضافة السجلات أو تعديلها أو حذفها.",
    catSalary: "رواتب العمال", catFeedRoughage: "العلف – الأعشاب والدريس", catFeedConcentrate: "العلف – الحبوب والبروتين",
    catMedicine: "الأدوية والرعاية البيطرية", catBreeding: "التكاثر والتطعيم", catWater: "إمدادات المياه",
    catElectricity: "الكهرباء", catRent: "الإيجار وإيجار الأرض", catTransport: "النقل والوقود",
    catVehicleMaint: "صيانة المركبات والتأمين", catEquipment: "المعدات والأدوات",
    catShearing: "الجز والعناية", catInfrastructure: "الأسوار والبنية التحتية",
    catInsurance: "تأمين المزرعة", catLivestockPurchase: "شراء المواشي", catOtherExpense: "مصروفات أخرى",
    catLivestockSale: "بيع المواشي", catProductSale: "الحليب والصوف والمنتجات",
    catBreedingIncome: "رسوم التكاثر / التلقيح", catOtherIncome: "دخل آخر",
    footerRights: "جميع الحقوق محفوظة.",
    footerConfidential: "سجلات مالية سرية — للاستخدام الداخلي فقط.",
    idleLockedNotice: "تم قفل جلسة المالك تلقائيًا بعد فترة من الخمول لأسباب أمنية.",
  },
};
const MONTHS = {
  en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  ar: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
};

// ---------- categories ----------
const EXPENSE_CATS = [
  { key: "salary", labelKey: "catSalary", icon: Users, color: "#8B5E34" },
  { key: "feed_roughage", labelKey: "catFeedRoughage", icon: Sprout, color: "#7A9B57" },
  { key: "feed_concentrate", labelKey: "catFeedConcentrate", icon: Wheat, color: "#C99A3C" },
  { key: "medicine", labelKey: "catMedicine", icon: Pill, color: "#6E8B5E" },
  { key: "breeding", labelKey: "catBreeding", icon: Syringe, color: "#8B6F9E" },
  { key: "water", labelKey: "catWater", icon: Droplet, color: "#4A7A8C" },
  { key: "electricity", labelKey: "catElectricity", icon: Zap, color: "#C9A63C" },
  { key: "rent", labelKey: "catRent", icon: HomeIcon, color: "#4A6670" },
  { key: "transport", labelKey: "catTransport", icon: Truck, color: "#6B4226" },
  { key: "vehicle_maintenance", labelKey: "catVehicleMaint", icon: Car, color: "#7A5230" },
  { key: "equipment", labelKey: "catEquipment", icon: Wrench, color: "#5C6B4F" },
  { key: "shearing", labelKey: "catShearing", icon: Scissors, color: "#9B7653" },
  { key: "infrastructure", labelKey: "catInfrastructure", icon: Hammer, color: "#71685A" },
  { key: "insurance", labelKey: "catInsurance", icon: ShieldCheck, color: "#4A5D6B" },
  { key: "livestock_purchase", labelKey: "catLivestockPurchase", icon: PawPrint, color: "#A63D2F" },
  { key: "other_expense", labelKey: "catOtherExpense", icon: MoreHorizontal, color: "#8A7F6B" },
];
const INCOME_CATS = [
  { key: "livestock_sale", labelKey: "catLivestockSale", icon: PawPrint, color: "#4F6B3D" },
  { key: "product_sale", labelKey: "catProductSale", icon: ShoppingBag, color: "#C99A3C" },
  { key: "breeding_income", labelKey: "catBreedingIncome", icon: HeartHandshake, color: "#3D7A6B" },
  { key: "other_income", labelKey: "catOtherIncome", icon: TrendingUp, color: "#2E8B6E" },
];
const ALL_CATS = [...EXPENSE_CATS, ...INCOME_CATS];
const CURRENCIES = ["$", "€", "£", "﷼", "د.إ", "ر.س", "₹", "₨", "R", "₦", "kr"];

// ---------- team accounts ----------
// Add or remove people who can log in here, then republish the site.
// role must be exactly "owner" (full access) or "viewer" (read-only).
const USERS = [
  { email: "example@email.com", password: "changeme123", role: "viewer" },
];
 { email: "sara@gmaill.com", password: "12345", role: "viewer" },
];

function Monogram({ name, size = 40 }) {
  // A sheep-and-"Z" mark: the letter Z is drawn as a bold stroke whose top-right
  // corner becomes a sheep's head (ears + face), whose diagonal carries three
  // fleece tufts, and whose base sprouts four little legs — a single motif that
  // reads as both "Z" (for the farm name) and "sheep" (for the flock).
  return (
    <div
      className="flex items-center justify-center rounded-xl shrink-0 relative overflow-hidden"
      style={{
        width: size, height: size, background: "linear-gradient(155deg,#5C7A47,#2B3B1B)",
        boxShadow: "0 1px 2px rgba(36,48,31,0.35), inset 0 0 0 1px rgba(255,255,255,0.10)",
      }}
      title={name}
    >
      <svg viewBox="0 0 100 100" width="72%" height="72%" fill="none">
        {/* legs, standing on the base of the Z */}
        <g stroke="#F3EEE1" strokeWidth="6" strokeLinecap="round" opacity="0.9">
          <line x1="34" y1="76" x2="34" y2="88" />
          <line x1="46" y1="76" x2="46" y2="88" />
          <line x1="62" y1="76" x2="62" y2="88" />
          <line x1="74" y1="76" x2="74" y2="88" />
        </g>
        {/* the Z stroke: top bar, diagonal, bottom bar */}
        <path
          d="M23,26 L77,26 L23,76 L77,76"
          stroke="#F3EEE1"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* fleece tufts along the diagonal */}
        <circle cx="52" cy="46" r="7.5" fill="#F3EEE1" />
        <circle cx="42" cy="56" r="6" fill="#F3EEE1" />
        <circle cx="60" cy="38" r="5.5" fill="#F3EEE1" />
        {/* sheep head, riding the top-right corner of the Z */}
        <g>
          <ellipse cx="79" cy="18" rx="10.5" ry="9" fill="#F3EEE1" />
          <ellipse cx="70.5" cy="10.5" rx="4.2" ry="5.2" fill="#F3EEE1" transform="rotate(-25 70.5 10.5)" />
          <ellipse cx="87" cy="10.5" rx="4.2" ry="5.2" fill="#F3EEE1" transform="rotate(25 87 10.5)" />
          <circle cx="76" cy="17" r="1.6" fill="#2B3B1B" />
        </g>
      </svg>
    </div>
  );
}

function Footer({ t, farmName }) {
  const year = new Date().getFullYear();
  return (
    <footer className="max-w-6xl mx-auto px-5 py-8 text-center">
      <div className="fence mb-4 rounded-full opacity-70" />
      <p className="text-xs text-[#8A7F6B]">© {year} {farmName}. {t("footerRights")}</p>
      <p className="text-[11px] text-[#B4A98C] mt-1 uppercase tracking-wide">{t("footerConfidential")}</p>
    </footer>
  );
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
function catInfo(key) { return ALL_CATS.find(c => c.key === key) || EXPENSE_CATS[EXPENSE_CATS.length - 1]; }
function monthKey(dateStr) { return dateStr.slice(0, 7); }

export default function App() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({ pin: "2684", farmName: "Zamzami Livestock", currency: "$" });
  const [transactions, setTransactions] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [livestock, setLivestock] = useState([]);
  const [mode, setMode] = useState(null);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [setupPin, setSetupPin] = useState("");
  const [setupPin2, setSetupPin2] = useState("");
  const [setupErr, setSetupErr] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [selMonth, setSelMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [pinPromptOpen, setPinPromptOpen] = useState(false);
  const [lang, setLang] = useState("en");

  const t = (key) => (T[lang] && T[lang][key]) || T.en[key] || key;
  const dir = lang === "ar" ? "rtl" : "ltr";
  function fmtMonth(mk) { const [y, m] = mk.split("-"); return `${MONTHS[lang][parseInt(m, 10) - 1]} ${y}`; }

  useEffect(() => {
    (async () => {
      try {
        const [s, tr, w, l, ul] = await Promise.allSettled([
          window.storage.get("settings", true),
          window.storage.get("transactions", true),
          window.storage.get("workers", true),
          window.storage.get("livestock", true),
          window.storage.get("ui_lang", false),
        ]);
        if (s.status === "fulfilled" && s.value) {
          const parsed = JSON.parse(s.value.value);
          setSettings({ ...parsed, pin: parsed.pin || "2684" });
        }
        if (tr.status === "fulfilled" && tr.value) setTransactions(JSON.parse(tr.value.value));
        if (w.status === "fulfilled" && w.value) setWorkers(JSON.parse(w.value.value));
        if (l.status === "fulfilled" && l.value) setLivestock(JSON.parse(l.value.value));
        if (ul.status === "fulfilled" && ul.value) setLang(ul.value.value);
      } catch (e) { console.error("load error", e); }
      finally { setLoading(false); }
    })();
  }, []);

  async function persist(key, value, setter) {
    setter(value);
    try { await window.storage.set(key, JSON.stringify(value), true); }
    catch (e) { console.error("save error", key, e); }
  }
  const saveSettings = (v) => persist("settings", v, setSettings);
  const saveTransactions = (v) => persist("transactions", v, setTransactions);
  const saveWorkers = (v) => persist("workers", v, setWorkers);
  const saveLivestock = (v) => persist("livestock", v, setLivestock);
  async function changeLang(v) {
    setLang(v);
    try { await window.storage.set("ui_lang", v, false); } catch (e) { console.error(e); }
  }

  const isOwner = mode === "owner";

  // Auto-lock owner session after 15 minutes of inactivity.
  useEffect(() => {
    if (!isOwner) return;
    const IDLE_MS = 15 * 60 * 1000;
    let timer = setTimeout(() => setMode(null), IDLE_MS);
    const reset = () => { clearTimeout(timer); timer = setTimeout(() => setMode(null), IDLE_MS); };
    const events = ["mousemove", "keydown", "click", "touchstart"];
    events.forEach(ev => window.addEventListener(ev, reset));
    return () => { clearTimeout(timer); events.forEach(ev => window.removeEventListener(ev, reset)); };
  }, [isOwner]);

  const monthly12 = useMemo(() => {
    const now = new Date();
    const arr = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mk = d.toISOString().slice(0, 7);
      const inc = transactions.filter(t2 => t2.type === "income" && monthKey(t2.date) === mk).reduce((a, b) => a + b.amount, 0);
      const exp = transactions.filter(t2 => t2.type === "expense" && monthKey(t2.date) === mk).reduce((a, b) => a + b.amount, 0);
      arr.push({ month: MONTHS[lang][d.getMonth()], mk, income: inc, expense: exp, net: inc - exp });
    }
    return arr;
  }, [transactions, lang]);

  const thisMonthKey = new Date().toISOString().slice(0, 7);
  const thisMonth = monthly12.find(m => m.mk === thisMonthKey) || { income: 0, expense: 0, net: 0 };
  const yearNow = new Date().getFullYear();
  const yearTx = transactions.filter(t2 => t2.date.slice(0, 4) === String(yearNow));
  const yearIncome = yearTx.filter(t2 => t2.type === "income").reduce((a, b) => a + b.amount, 0);
  const yearExpense = yearTx.filter(t2 => t2.type === "expense").reduce((a, b) => a + b.amount, 0);

  const selMonthTx = transactions.filter(t2 => monthKey(t2.date) === selMonth).sort((a, b) => b.date.localeCompare(a.date));
  const catBreakdown = useMemo(() => {
    const map = {};
    selMonthTx.filter(t2 => t2.type === "expense").forEach(t2 => { map[t2.category] = (map[t2.category] || 0) + t2.amount; });
    return Object.entries(map).map(([key, value]) => ({ name: t(catInfo(key).labelKey), value, color: catInfo(key).color }));
  }, [selMonthTx, lang]);

  const livestockCounts = useMemo(() => {
    const map = {};
    livestock.forEach(l => {
      const delta = l.action === "loss" || l.action === "sale" ? -l.count : l.count;
      map[l.species] = (map[l.species] || 0) + delta;
    });
    return map;
  }, [livestock]);

  function currency(n) {
    const s = settings.currency || "$";
    return `${s}${Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F3EEE1" }}>
        <div className="text-[#4F6B3D] font-medium animate-pulse">…</div>
      </div>
    );
  }

  if (mode === null) {
    const needsSetup = false;
    return (
      <GateScreen
        lang={lang} setLang={changeLang} t={t} dir={dir}
        needsSetup={needsSetup} farmName={settings.farmName}
        setupPin={setupPin} setSetupPin={setSetupPin}
        setupPin2={setupPin2} setSetupPin2={setSetupPin2}
        setupErr={setupErr}
        pinInput={pinInput} setPinInput={setPinInput}
        pinError={pinError}
        emailInput={emailInput} setEmailInput={setEmailInput}
        passwordInput={passwordInput} setPasswordInput={setPasswordInput}
        loginError={loginError}
        onCreatePin={() => {
          if (setupPin.length < 4) { setSetupErr(t("pinTooShort")); return; }
          if (setupPin !== setupPin2) { setSetupErr(t("pinMismatch")); return; }
          saveSettings({ ...settings, pin: setupPin });
          setMode("owner");
        }}
        onOwnerLogin={() => {
          if (pinInput === settings.pin) { setMode("owner"); setPinInput(""); setPinError(""); }
          else setPinError(t("pinWrong"));
        }}
        onMemberLogin={() => {
          const email = emailInput.trim().toLowerCase();
          const found = USERS.find(u => u.email.toLowerCase() === email && u.password === passwordInput);
          if (found) { setMode(found.role); setEmailInput(""); setPasswordInput(""); setLoginError(""); }
          else setLoginError(t("loginWrong"));
        }}
      />
    );
  }

  return (
    <div dir={dir} className="min-h-screen" style={{ background: "#F3EEE1", fontFamily: lang === "ar" ? "'Cairo','Noto Kufi Arabic',sans-serif" : "'Inter',sans-serif", color: "#24301F" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&family=Cairo:wght@500;600;700&family=Noto+Kufi+Arabic:wght@500;600;700&display=swap');
        .slab { font-family: ${lang === "ar" ? "'Cairo',sans-serif" : "'Zilla Slab',serif"}; }
        .mono { font-family: ${lang === "ar" ? "'Cairo',sans-serif" : "'IBM Plex Mono',monospace"}; }
        .fence { background-image: repeating-linear-gradient(90deg, #C9BFA5 0, #C9BFA5 6px, transparent 6px, transparent 14px); height: 2px; }
        .stamp { border: 2px dashed currentColor; transform: rotate(${lang === "ar" ? "2deg" : "-2deg"}); }
        .card { background: #FAF6EC; border: 1px solid #E4DBC6; border-radius: 14px; }
        ::-webkit-scrollbar { height: 8px; width: 8px; }
        ::-webkit-scrollbar-thumb { background: #D8CDAF; border-radius: 8px; }
      `}</style>

      <header className="border-b" style={{ borderColor: "#E4DBC6" }}>
        <div className="max-w-6xl mx-auto px-5 pt-6 pb-4">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Monogram name={settings.farmName} size={44} />
              <div>
                <div className="text-xs tracking-widest uppercase text-[#8A7F6B] mono">{t("appTitle")}</div>
                {isOwner ? (
                  <input
                    value={settings.farmName}
                    onChange={e => saveSettings({ ...settings, farmName: e.target.value })}
                    className="slab text-3xl font-semibold bg-transparent outline-none border-b border-transparent focus:border-[#C9A66B] -ml-0.5 px-0.5"
                    style={{ color: "#1C2617" }}
                  />
                ) : (
                  <h1 className="slab text-3xl font-semibold" style={{ color: "#1C2617" }}>{settings.farmName}</h1>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-md overflow-hidden border border-[#E4DBC6] text-xs font-semibold">
                <button onClick={() => changeLang("en")} className={`px-2.5 py-1.5 ${lang === "en" ? "bg-[#4F6B3D] text-white" : "bg-[#EDE6D2] text-[#24301F]"}`}>EN</button>
                <button onClick={() => changeLang("ar")} className={`px-2.5 py-1.5 ${lang === "ar" ? "bg-[#4F6B3D] text-white" : "bg-[#EDE6D2] text-[#24301F]"}`}>AR</button>
              </div>
              <div className={`stamp px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5 ${isOwner ? "text-[#4F6B3D]" : "text-[#4A6670]"}`}>
                {isOwner ? <ShieldCheck size={14} /> : <Eye size={14} />}
                {isOwner ? t("ownerMode") : t("viewingOnly")}
              </div>
              {isOwner ? (
                <button onClick={() => setMode(null)} className="p-2 rounded-md bg-[#EDE6D2] hover:bg-[#E4DBC6] text-[#24301F]" title="Lock">
                  <Lock size={16} />
                </button>
              ) : (
                <button onClick={() => setPinPromptOpen(true)} className="p-2 rounded-md bg-[#EDE6D2] hover:bg-[#E4DBC6] text-[#24301F]" title="Owner login">
                  <Unlock size={16} />
                </button>
              )}
            </div>
          </div>
          <div className="fence mt-4 mb-4 rounded-full" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SummaryCard label={t("thisMonthIn")} value={currency(thisMonth.income)} icon={TrendingUp} tone="#4F6B3D" />
            <SummaryCard label={t("thisMonthOut")} value={currency(thisMonth.expense)} icon={TrendingDown} tone="#A63D2F" />
            <SummaryCard label={t("thisMonthNet")} value={currency(thisMonth.income - thisMonth.expense)} icon={Wallet} tone={thisMonth.income - thisMonth.expense >= 0 ? "#4F6B3D" : "#A63D2F"} />
            <SummaryCard label={`${yearNow} · ${t("yearNet")}`} value={currency(yearIncome - yearExpense)} icon={Wallet} tone={yearIncome - yearExpense >= 0 ? "#4F6B3D" : "#A63D2F"} />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 flex gap-1 overflow-x-auto">
          {[
            { key: "overview", label: t("tabOverview"), icon: LayoutGrid },
            { key: "transactions", label: t("tabTransactions"), icon: Receipt },
            { key: "salaries", label: t("tabSalaries"), icon: Users },
            { key: "livestock", label: t("tabLivestock"), icon: PawPrint },
            { key: "settings", label: t("tabSettings"), icon: SettingsIcon },
          ].map(tb => (
            <button
              key={tb.key}
              onClick={() => setActiveTab(tb.key)}
              className={`px-4 py-2.5 text-sm font-medium flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors ${activeTab === tb.key ? "border-[#4F6B3D] text-[#24301F]" : "border-transparent text-[#8A7F6B] hover:text-[#24301F]"}`}
            >
              <tb.icon size={15} /> {tb.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-6">
        {activeTab === "overview" && (
          <OverviewTab t={t} fmtMonth={fmtMonth} monthly12={monthly12} catBreakdown={catBreakdown} selMonth={selMonth} setSelMonth={setSelMonth} currency={currency} selMonthTx={selMonthTx} />
        )}
        {activeTab === "transactions" && (
          <TransactionsTab t={t} isOwner={isOwner} transactions={transactions} saveTransactions={saveTransactions} currency={currency} />
        )}
        {activeTab === "salaries" && (
          <SalariesTab t={t} fmtMonth={fmtMonth} isOwner={isOwner} workers={workers} saveWorkers={saveWorkers} transactions={transactions} saveTransactions={saveTransactions} currency={currency} />
        )}
        {activeTab === "livestock" && (
          <LivestockTab t={t} isOwner={isOwner} livestock={livestock} saveLivestock={saveLivestock} counts={livestockCounts} />
        )}
        {activeTab === "settings" && (
          <SettingsTab t={t} isOwner={isOwner} settings={settings} saveSettings={saveSettings} transactions={transactions} workers={workers} livestock={livestock} />
        )}
      </main>

      <Footer t={t} farmName={settings.farmName} />

      {pinPromptOpen && (
        <PinModal
          t={t}
          onClose={() => setPinPromptOpen(false)}
          onSubmit={(val) => {
            if (val === settings.pin) { setMode("owner"); setPinPromptOpen(false); }
            else return t("pinWrong");
          }}
        />
      )}
    </div>
  );
}

function GateScreen({ lang, setLang, t, dir, needsSetup, farmName, setupPin, setSetupPin, setupPin2, setSetupPin2, setupErr, pinInput, setPinInput, pinError, emailInput, setEmailInput, passwordInput, setPasswordInput, loginError, onCreatePin, onOwnerLogin, onMemberLogin }) {
  return (
    <div dir={dir} className="min-h-screen flex items-center justify-center px-4" style={{ background: "#F3EEE1", fontFamily: lang === "ar" ? "'Cairo',sans-serif" : "'Inter',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@600;700&family=Inter:wght@400;500;600&family=Cairo:wght@600;700&display=swap');`}</style>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <div className="flex items-center rounded-md overflow-hidden border border-[#E4DBC6] text-xs font-semibold">
            <button onClick={() => setLang("en")} className={`px-3 py-1.5 ${lang === "en" ? "bg-[#4F6B3D] text-white" : "bg-[#EDE6D2] text-[#24301F]"}`}>EN</button>
            <button onClick={() => setLang("ar")} className={`px-3 py-1.5 ${lang === "ar" ? "bg-[#4F6B3D] text-white" : "bg-[#EDE6D2] text-[#24301F]"}`}>AR</button>
          </div>
        </div>
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3"><Monogram name={farmName} size={52} /></div>
          <div className="text-xs tracking-widest uppercase text-[#8A7F6B] mb-1">{t("appTitle")}</div>
          <h1 className="text-3xl font-semibold" style={{ fontFamily: lang === "ar" ? "'Cairo',sans-serif" : "'Zilla Slab',serif", color: "#1C2617" }}>{farmName || "Your Farm"}</h1>
        </div>
        <div className="rounded-2xl p-6" style={{ background: "#FAF6EC", border: "1px solid #E4DBC6" }}>
          {needsSetup ? (
            <>
              <h2 className="font-semibold mb-1" style={{ color: "#24301F" }}>{t("setupTitle")}</h2>
              <p className="text-sm text-[#8A7F6B] mb-4">{t("setupDesc")}</p>
              <input type="password" inputMode="numeric" placeholder={t("createPinPh")} value={setupPin} onChange={e => setSetupPin(e.target.value)} className="w-full mb-2 px-3 py-2 rounded-lg border border-[#E4DBC6] bg-white outline-none focus:border-[#4F6B3D]" />
              <input type="password" inputMode="numeric" placeholder={t("confirmPinPh")} value={setupPin2} onChange={e => setSetupPin2(e.target.value)} className="w-full mb-2 px-3 py-2 rounded-lg border border-[#E4DBC6] bg-white outline-none focus:border-[#4F6B3D]" />
              {setupErr && <div className="text-sm text-[#A63D2F] mb-2">{setupErr}</div>}
              <button onClick={onCreatePin} className="w-full py-2.5 rounded-lg bg-[#4F6B3D] text-white font-medium hover:bg-[#3f5731]">{t("createLedgerBtn")}</button>
            </>
          ) : (
            <>
              <h2 className="font-semibold mb-1" style={{ color: "#24301F" }}>{t("ownerLoginTitle")}</h2>
              <p className="text-sm text-[#8A7F6B] mb-4">{t("ownerLoginDesc")}</p>
              <input type="password" inputMode="numeric" placeholder={t("pinPh")} value={pinInput} onChange={e => setPinInput(e.target.value)} onKeyDown={e => e.key === "Enter" && onOwnerLogin()} className="w-full mb-2 px-3 py-2 rounded-lg border border-[#E4DBC6] bg-white outline-none focus:border-[#4F6B3D]" />
              {pinError && <div className="text-sm text-[#A63D2F] mb-2">{pinError}</div>}
              <button onClick={onOwnerLogin} className="w-full py-2.5 rounded-lg bg-[#4F6B3D] text-white font-medium hover:bg-[#3f5731] mb-2">{t("unlockOwnerBtn")}</button>
              <div className="my-4 border-t" style={{ borderColor: "#E4DBC6" }} />
              <h3 className="font-semibold mb-1 text-sm" style={{ color: "#24301F" }}>{t("memberLoginTitle")}</h3>
              <p className="text-sm text-[#8A7F6B] mb-3">{t("memberLoginDesc")}</p>
              <input type="email" placeholder={t("emailPh")} value={emailInput} onChange={e => setEmailInput(e.target.value)} className="w-full mb-2 px-3 py-2 rounded-lg border border-[#E4DBC6] bg-white outline-none focus:border-[#4F6B3D]" />
              <input type="password" placeholder={t("passwordPh")} value={passwordInput} onChange={e => setPasswordInput(e.target.value)} onKeyDown={e => e.key === "Enter" && onMemberLogin()} className="w-full mb-2 px-3 py-2 rounded-lg border border-[#E4DBC6] bg-white outline-none focus:border-[#4F6B3D]" />
              {loginError && <div className="text-sm text-[#A63D2F] mb-2">{loginError}</div>}
              <button onClick={onMemberLogin} className="w-full py-2.5 rounded-lg bg-[#EDE6D2] text-[#24301F] font-medium hover:bg-[#E4DBC6]">{t("memberLoginBtn")}</button>
            </>
          )}
        </div>
        <Footer t={t} farmName={farmName} />
      </div>
    </div>
  );
}

function PinModal({ t, onClose, onSubmit }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4" onClick={onClose}>
      <div className="card p-5 w-full max-w-xs" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold slab">{t("ownerPinModalTitle")}</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <input autoFocus type="password" inputMode="numeric" value={val} onChange={e => setVal(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { const r = onSubmit(val); if (r) setErr(r); } }}
          className="w-full mb-2 px-3 py-2 rounded-lg border border-[#E4DBC6] bg-white outline-none focus:border-[#4F6B3D]" placeholder={t("pinPh")} />
        {err && <div className="text-sm text-[#A63D2F] mb-2">{err}</div>}
        <button onClick={() => { const r = onSubmit(val); if (r) setErr(r); }} className="w-full py-2 rounded-lg bg-[#4F6B3D] text-white font-medium">{t("unlockBtn")}</button>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, icon: Icon, tone }) {
  return (
    <div className="card p-3.5">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-[#8A7F6B] mb-1.5"><Icon size={13} style={{ color: tone }} />{label}</div>
      <div className="mono text-xl font-semibold" style={{ color: tone }}>{value}</div>
    </div>
  );
}

function OverviewTab({ t, fmtMonth, monthly12, catBreakdown, selMonth, setSelMonth, currency, selMonthTx }) {
  return (
    <div className="space-y-6">
      <div className="card p-4">
        <h3 className="slab font-semibold mb-3">{t("chart12moTitle")}</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthly12}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4DBC6" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#8A7F6B" }} />
            <YAxis tick={{ fontSize: 12, fill: "#8A7F6B" }} />
            <Tooltip formatter={(v) => currency(v)} contentStyle={{ borderRadius: 8, border: "1px solid #E4DBC6", fontSize: 13 }} />
            <Legend />
            <Bar dataKey="income" name={t("incomeOpt")} fill="#4F6B3D" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" name={t("expenseOpt")} fill="#A63D2F" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card p-4">
        <h3 className="slab font-semibold mb-3">{t("netTrendTitle")}</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={monthly12}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4DBC6" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#8A7F6B" }} />
            <YAxis tick={{ fontSize: 12, fill: "#8A7F6B" }} />
            <Tooltip formatter={(v) => currency(v)} contentStyle={{ borderRadius: 8, border: "1px solid #E4DBC6", fontSize: 13 }} />
            <Line type="monotone" dataKey="net" name={t("thisMonthNet")} stroke="#C99A3C" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="slab font-semibold">{t("whereMoneyWentTitle")}</h3>
          <input type="month" value={selMonth} onChange={e => setSelMonth(e.target.value)} className="px-2 py-1.5 rounded-lg border border-[#E4DBC6] bg-white text-sm" />
        </div>
        {catBreakdown.length === 0 ? (
          <p className="text-sm text-[#8A7F6B] py-8 text-center">{t("noExpensesFor").replace("{month}", fmtMonth(selMonth))}</p>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-4">
            <ResponsiveContainer width="100%" height={220} className="md:max-w-xs">
              <PieChart>
                <Pie data={catBreakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {catBreakdown.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Pie>
                <Tooltip formatter={(v) => currency(v)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 w-full space-y-1.5">
              {catBreakdown.sort((a, b) => b.value - a.value).map((c, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-1 border-b border-[#EDE6D2] last:border-0">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />{c.name}</span>
                  <span className="mono font-medium">{currency(c.value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card p-4">
        <h3 className="slab font-semibold mb-3">{t("recentActivityTitle")} — {fmtMonth(selMonth)}</h3>
        {selMonthTx.length === 0 ? <p className="text-sm text-[#8A7F6B]">{t("nothingRecorded")}</p> : (
          <div className="space-y-1.5">
            {selMonthTx.slice(0, 8).map(tr => {
              const c = catInfo(tr.category);
              return (
                <div key={tr.id} className="flex items-center justify-between text-sm py-1.5 border-b border-[#EDE6D2] last:border-0">
                  <span className="flex items-center gap-2 text-[#24301F]"><c.icon size={14} style={{ color: c.color }} />{tr.note || t(c.labelKey)}<span className="text-[#8A7F6B] text-xs mono">{tr.date}</span></span>
                  <span className={`mono font-medium ${tr.type === "income" ? "text-[#4F6B3D]" : "text-[#A63D2F]"}`}>{tr.type === "income" ? "+" : "−"}{currency(tr.amount)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function TransactionsTab({ t, isOwner, transactions, saveTransactions, currency }) {
  const [form, setForm] = useState({ type: "expense", category: "feed_roughage", date: new Date().toISOString().slice(0, 10), amount: "", note: "" });
  const [filterMonth, setFilterMonth] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [editingId, setEditingId] = useState(null);

  const cats = form.type === "income" ? INCOME_CATS : EXPENSE_CATS;

  function submit() {
    if (!form.amount || isNaN(parseFloat(form.amount))) return;
    const entry = { id: editingId || uid(), type: form.type, category: form.category, date: form.date, amount: parseFloat(form.amount), note: form.note };
    if (editingId) saveTransactions(transactions.map(tr => tr.id === editingId ? entry : tr));
    else saveTransactions([...transactions, entry]);
    setForm({ type: form.type, category: form.category, date: form.date, amount: "", note: "" });
    setEditingId(null);
  }
  function edit(tr) { setForm({ type: tr.type, category: tr.category, date: tr.date, amount: String(tr.amount), note: tr.note || "" }); setEditingId(tr.id); }
  function del(id) { saveTransactions(transactions.filter(tr => tr.id !== id)); if (editingId === id) setEditingId(null); }

  const filtered = transactions
    .filter(tr => !filterMonth || monthKey(tr.date) === filterMonth)
    .filter(tr => filterType === "all" || tr.type === filterType)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-5">
      {isOwner && (
        <div className="card p-4">
          <h3 className="slab font-semibold mb-3">{editingId ? t("addEditTitleEdit") : t("addEditTitleAdd")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 items-end">
            <div className="col-span-2 md:col-span-1">
              <label className="text-xs text-[#8A7F6B] block mb-1">{t("typeLabel")}</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value, category: e.target.value === "income" ? "livestock_sale" : "feed_roughage" })} className="w-full px-2 py-2 rounded-lg border border-[#E4DBC6] bg-white text-sm">
                <option value="expense">{t("expenseOpt")}</option>
                <option value="income">{t("incomeOpt")}</option>
              </select>
            </div>
            <div className="col-span-2 md:col-span-2">
              <label className="text-xs text-[#8A7F6B] block mb-1">{t("categoryLabel")}</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-2 py-2 rounded-lg border border-[#E4DBC6] bg-white text-sm">
                {cats.map(c => <option key={c.key} value={c.key}>{t(c.labelKey)}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-[#8A7F6B] block mb-1">{t("dateLabel")}</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full px-2 py-2 rounded-lg border border-[#E4DBC6] bg-white text-sm" />
            </div>
            <div>
              <label className="text-xs text-[#8A7F6B] block mb-1">{t("amountLabel")}</label>
              <input type="number" step="0.01" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="0.00" className="w-full px-2 py-2 rounded-lg border border-[#E4DBC6] bg-white text-sm" />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="text-xs text-[#8A7F6B] block mb-1">{t("noteLabel")}</label>
              <input value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} placeholder={t("noteOptionalPh")} className="w-full px-2 py-2 rounded-lg border border-[#E4DBC6] bg-white text-sm" />
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={submit} className="px-4 py-2 rounded-lg bg-[#4F6B3D] text-white text-sm font-medium flex items-center gap-1.5 hover:bg-[#3f5731]"><Plus size={15} />{editingId ? t("saveChangesBtn") : t("addEntryBtn")}</button>
            {editingId && <button onClick={() => { setEditingId(null); setForm({ type: "expense", category: "feed_roughage", date: new Date().toISOString().slice(0, 10), amount: "", note: "" }); }} className="px-4 py-2 rounded-lg bg-[#EDE6D2] text-sm font-medium">{t("cancelBtn")}</button>}
          </div>
        </div>
      )}

      <div className="card p-4">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="slab font-semibold">{t("allRecordsTitle")}</h3>
          <div className="flex gap-2">
            <input type="month" value={filterMonth} onChange={e => setFilterMonth(e.target.value)} className="px-2 py-1.5 rounded-lg border border-[#E4DBC6] bg-white text-sm" />
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-2 py-1.5 rounded-lg border border-[#E4DBC6] bg-white text-sm">
              <option value="all">{t("allOpt")}</option><option value="income">{t("incomeOpt")}</option><option value="expense">{t("expenseOpt")}</option>
            </select>
          </div>
        </div>
        {filtered.length === 0 ? <p className="text-sm text-[#8A7F6B] py-6 text-center">{t("noRecordsMatch")}</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-[#8A7F6B] border-b border-[#E4DBC6]"><th className="pb-2 font-medium">{t("colDate")}</th><th className="pb-2 font-medium">{t("colCategory")}</th><th className="pb-2 font-medium">{t("colNote")}</th><th className="pb-2 font-medium text-right">{t("colAmount")}</th>{isOwner && <th className="pb-2"></th>}</tr></thead>
              <tbody>
                {filtered.map(tr => {
                  const c = catInfo(tr.category);
                  return (
                    <tr key={tr.id} className="border-b border-[#EDE6D2] last:border-0">
                      <td className="py-2 mono text-xs">{tr.date}</td>
                      <td className="py-2"><span className="flex items-center gap-1.5"><c.icon size={13} style={{ color: c.color }} />{t(c.labelKey)}</span></td>
                      <td className="py-2 text-[#8A7F6B]">{tr.note || "—"}</td>
                      <td className={`py-2 text-right mono font-medium ${tr.type === "income" ? "text-[#4F6B3D]" : "text-[#A63D2F]"}`}>{tr.type === "income" ? "+" : "−"}{currency(tr.amount)}</td>
                      {isOwner && (
                        <td className="py-2 text-right whitespace-nowrap">
                          <button onClick={() => edit(tr)} className="p-1 hover:text-[#4F6B3D]"><Pencil size={14} /></button>
                          <button onClick={() => del(tr.id)} className="p-1 hover:text-[#A63D2F]"><Trash2 size={14} /></button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function SalariesTab({ t, fmtMonth, isOwner, workers, saveWorkers, transactions, saveTransactions, currency }) {
  const [form, setForm] = useState({ name: "", role: "", salary: "" });
  const thisMonth = new Date().toISOString().slice(0, 7);

  function addWorker() {
    if (!form.name || !form.salary) return;
    saveWorkers([...workers, { id: uid(), name: form.name, role: form.role, salary: parseFloat(form.salary) }]);
    setForm({ name: "", role: "", salary: "" });
  }
  function delWorker(id) { saveWorkers(workers.filter(w => w.id !== id)); }

  function isPaid(workerId) {
    return transactions.some(tr => tr.type === "expense" && tr.category === "salary" && tr.workerId === workerId && monthKey(tr.date) === thisMonth);
  }
  function markPaid(w) {
    if (isPaid(w.id)) {
      saveTransactions(transactions.filter(tr => !(tr.type === "expense" && tr.category === "salary" && tr.workerId === w.id && monthKey(tr.date) === thisMonth)));
    } else {
      saveTransactions([...transactions, { id: uid(), type: "expense", category: "salary", date: new Date().toISOString().slice(0, 10), amount: w.salary, note: w.name, workerId: w.id }]);
    }
  }

  return (
    <div className="space-y-5">
      {isOwner && (
        <div className="card p-4">
          <h3 className="slab font-semibold mb-3">{t("addWorkerTitle")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-end">
            <div><label className="text-xs text-[#8A7F6B] block mb-1">{t("nameLabel")}</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-2 py-2 rounded-lg border border-[#E4DBC6] bg-white text-sm" /></div>
            <div><label className="text-xs text-[#8A7F6B] block mb-1">{t("roleLabel")}</label><input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder={t("rolePh")} className="w-full px-2 py-2 rounded-lg border border-[#E4DBC6] bg-white text-sm" /></div>
            <div><label className="text-xs text-[#8A7F6B] block mb-1">{t("monthlySalaryLabel")}</label><input type="number" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} className="w-full px-2 py-2 rounded-lg border border-[#E4DBC6] bg-white text-sm" /></div>
            <button onClick={addWorker} className="px-4 py-2 rounded-lg bg-[#4F6B3D] text-white text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-[#3f5731]"><Plus size={15} />{t("addBtn")}</button>
          </div>
        </div>
      )}
      <div className="card p-4">
        <h3 className="slab font-semibold mb-3">{t("teamTitle")} — {fmtMonth(thisMonth)}</h3>
        {workers.length === 0 ? <p className="text-sm text-[#8A7F6B] py-6 text-center">{t("noWorkersYet")}</p> : (
          <div className="grid md:grid-cols-2 gap-3">
            {workers.map(w => {
              const paid = isPaid(w.id);
              return (
                <div key={w.id} className="border border-[#E4DBC6] rounded-xl p-3 flex items-center justify-between bg-white/50">
                  <div>
                    <div className="font-medium">{w.name}</div>
                    <div className="text-xs text-[#8A7F6B]">{w.role || t("teamTitle")} · <span className="mono">{currency(w.salary)}{t("perMonth")}</span></div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isOwner ? (
                      <button onClick={() => markPaid(w)} className={`text-xs px-2.5 py-1.5 rounded-full font-medium flex items-center gap-1 ${paid ? "bg-[#E4EFDD] text-[#4F6B3D]" : "bg-[#F3E9DA] text-[#8A7F6B]"}`}>
                        {paid && <Check size={12} />}{paid ? t("paidLabel") : t("markPaidBtn")}
                      </button>
                    ) : (
                      <span className={`text-xs px-2.5 py-1.5 rounded-full font-medium ${paid ? "bg-[#E4EFDD] text-[#4F6B3D]" : "bg-[#F3E9DA] text-[#8A7F6B]"}`}>{paid ? t("paidLabel") : t("unpaidLabel")}</span>
                    )}
                    {isOwner && <button onClick={() => delWorker(w.id)} className="p-1 text-[#8A7F6B] hover:text-[#A63D2F]"><Trash2 size={14} /></button>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function LivestockTab({ t, isOwner, livestock, saveLivestock, counts }) {
  const [form, setForm] = useState({ species: "Sheep", action: "purchase", count: "", date: new Date().toISOString().slice(0, 10), note: "" });
  const actions = [
    { key: "purchase", label: t("actPurchase") }, { key: "birth", label: t("actBirth") },
    { key: "sale", label: t("actSale") }, { key: "loss", label: t("actLoss") },
  ];

  function add() {
    if (!form.count || isNaN(parseInt(form.count))) return;
    saveLivestock([...livestock, { id: uid(), ...form, count: parseInt(form.count) }]);
    setForm({ ...form, count: "", note: "" });
  }
  function del(id) { saveLivestock(livestock.filter(l => l.id !== id)); }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.keys(counts).length === 0 ? (
          <div className="col-span-2 md:col-span-4 text-sm text-[#8A7F6B] card p-4 text-center">{t("noLivestockYet")}</div>
        ) : Object.entries(counts).map(([species, count]) => (
          <div key={species} className="card p-3.5 flex items-center gap-2.5">
            <PawPrint size={20} className="text-[#A63D2F]" />
            <div><div className="text-xs text-[#8A7F6B] uppercase tracking-wide">{species}</div><div className="mono text-xl font-semibold">{count}</div></div>
          </div>
        ))}
      </div>

      {isOwner && (
        <div className="card p-4">
          <h3 className="slab font-semibold mb-3">{t("logChangeTitle")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 items-end">
            <div><label className="text-xs text-[#8A7F6B] block mb-1">{t("speciesLabel")}</label><input value={form.species} onChange={e => setForm({ ...form, species: e.target.value })} placeholder={t("speciesPh")} className="w-full px-2 py-2 rounded-lg border border-[#E4DBC6] bg-white text-sm" /></div>
            <div><label className="text-xs text-[#8A7F6B] block mb-1">{t("changeLabel")}</label><select value={form.action} onChange={e => setForm({ ...form, action: e.target.value })} className="w-full px-2 py-2 rounded-lg border border-[#E4DBC6] bg-white text-sm">{actions.map(a => <option key={a.key} value={a.key}>{a.label}</option>)}</select></div>
            <div><label className="text-xs text-[#8A7F6B] block mb-1">{t("countLabel")}</label><input type="number" value={form.count} onChange={e => setForm({ ...form, count: e.target.value })} className="w-full px-2 py-2 rounded-lg border border-[#E4DBC6] bg-white text-sm" /></div>
            <div><label className="text-xs text-[#8A7F6B] block mb-1">{t("dateLabel")}</label><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full px-2 py-2 rounded-lg border border-[#E4DBC6] bg-white text-sm" /></div>
            <button onClick={add} className="px-4 py-2 rounded-lg bg-[#4F6B3D] text-white text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-[#3f5731]"><Plus size={15} />{t("logBtn")}</button>
          </div>
          <input value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} placeholder={t("livestockNotePh")} className="w-full mt-2 px-2 py-2 rounded-lg border border-[#E4DBC6] bg-white text-sm" />
          <p className="text-xs text-[#8A7F6B] mt-2">{t("livestockTip")}</p>
        </div>
      )}

      <div className="card p-4">
        <h3 className="slab font-semibold mb-3">{t("historyTitle")}</h3>
        {livestock.length === 0 ? <p className="text-sm text-[#8A7F6B] py-4 text-center">{t("noHistoryYet")}</p> : (
          <div className="space-y-1.5">
            {[...livestock].sort((a, b) => b.date.localeCompare(a.date)).map(l => (
              <div key={l.id} className="flex items-center justify-between text-sm py-1.5 border-b border-[#EDE6D2] last:border-0">
                <span>{actions.find(a => a.key === l.action)?.label} <b>{l.count}</b> {l.species} {l.note && <span className="text-[#8A7F6B]">— {l.note}</span>} <span className="text-xs text-[#8A7F6B] mono">{l.date}</span></span>
                {isOwner && <button onClick={() => del(l.id)} className="p-1 text-[#8A7F6B] hover:text-[#A63D2F]"><Trash2 size={14} /></button>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsTab({ t, isOwner, settings, saveSettings, transactions, workers, livestock }) {
  const [newPin, setNewPin] = useState("");

  function exportData() {
    const blob = new Blob([JSON.stringify({ settings: { ...settings, pin: undefined }, transactions, workers, livestock }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${(settings.farmName || "farm").replace(/\s+/g, "-").toLowerCase()}-ledger-export.json`;
    a.click(); URL.revokeObjectURL(url);
  }

  if (!isOwner) {
    return <div className="card p-6 text-center text-sm text-[#8A7F6B]">{t("onlyOwnerSettings")}</div>;
  }

  return (
    <div className="space-y-5 max-w-md">
      <div className="card p-4">
        <h3 className="slab font-semibold mb-3">{t("currencyTitle")}</h3>
        <select value={settings.currency} onChange={e => saveSettings({ ...settings, currency: e.target.value })} className="w-full px-2 py-2 rounded-lg border border-[#E4DBC6] bg-white text-sm">
          {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="card p-4">
        <h3 className="slab font-semibold mb-3">{t("changePinTitle")}</h3>
        <div className="flex gap-2">
          <input type="password" inputMode="numeric" value={newPin} onChange={e => setNewPin(e.target.value)} placeholder={t("newPinPh")} className="flex-1 px-2 py-2 rounded-lg border border-[#E4DBC6] bg-white text-sm" />
          <button onClick={() => { if (newPin.length >= 4) { saveSettings({ ...settings, pin: newPin }); setNewPin(""); } }} className="px-4 py-2 rounded-lg bg-[#4F6B3D] text-white text-sm font-medium">{t("updateBtn")}</button>
        </div>
      </div>
      <div className="card p-4">
        <h3 className="slab font-semibold mb-3">{t("exportTitle")}</h3>
        <p className="text-sm text-[#8A7F6B] mb-3">{t("exportDesc")}</p>
        <button onClick={exportData} className="px-4 py-2 rounded-lg bg-[#EDE6D2] text-sm font-medium flex items-center gap-1.5"><Download size={15} />{t("exportBtn")}</button>
      </div>
      <div className="card p-4">
        <h3 className="slab font-semibold mb-3">{t("manageAccessTitle")}</h3>
        <p className="text-sm text-[#8A7F6B] mb-3">{t("manageAccessDesc")}</p>
        <div className="space-y-1.5">
          {USERS.length === 0 ? <p className="text-sm text-[#8A7F6B]">{t("noUsersYet")}</p> : USERS.map(u => (
            <div key={u.email} className="flex items-center justify-between text-sm py-1.5 border-b border-[#EDE6D2] last:border-0">
              <span className="flex items-center gap-2">{u.email}<span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${u.role === "owner" ? "bg-[#E4EFDD] text-[#4F6B3D]" : "bg-[#F3E9DA] text-[#8A7F6B]"}`}>{u.role === "owner" ? t("ownerRoleOpt") : t("viewerRoleOpt")}</span></span>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-4">
        <h3 className="slab font-semibold mb-3">{t("sharingTitle")}</h3>
        <p className="text-sm text-[#8A7F6B]">{t("sharingDesc")}</p>
      </div>
    </div>
  );
}
