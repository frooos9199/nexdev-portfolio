export type MenuLanguage = 'ar' | 'en';

export type LocalizedText = {
  ar: string;
  en: string;
};

export type MenuItem = {
  id: string;
  name: LocalizedText;
  price: number;
  note?: LocalizedText;
};

export type MenuSection = {
  id: string;
  group: LocalizedText;
  name: LocalizedText;
  items: MenuItem[];
};

export const MENU_STORAGE_KEY = 'harborMenu';

const item = (id: string, ar: string, en: string, price: number, noteAr?: string, noteEn?: string): MenuItem => ({
  id,
  name: { ar, en },
  price,
  ...(noteAr && noteEn ? { note: { ar: noteAr, en: noteEn } } : {}),
});

const shishaFlavors = [
  ['تفاحتين', 'Two Apple'],
  ['عنب نعناع', 'Grape Mint'],
  ['عنب', 'Grape'],
  ['ليمون نعناع', 'Lemon Mint'],
  ['شمام', 'Melon'],
  ['رقي', 'Watermelon'],
  ['بلوبيري', 'Blueberry'],
  ['نعناع', 'Mint'],
  ['ليمون', 'Lemon'],
  ['خوخ', 'Peach'],
  ['برتقال', 'Orange'],
  ['خمس نجوم', 'Five Star'],
  ['فراولة', 'Strawberry'],
  ['كرز', 'Cherry'],
  ['بحريني', 'Bahraini'],
  ['هاربر', 'Harbor'],
] as const;

export const defaultMenu: MenuSection[] = [
  {
    id: 'cocktail',
    group: { ar: 'مشروبات', en: 'Beverages' },
    name: { ar: 'كوكتيل', en: 'Cocktail' },
    items: [
      item('emperor', 'امبراطور', 'Emperor', 1.75),
      item('awar-qalb', 'عوار قلب', 'Awar Qalb', 1.75),
      item('layer-cocktail', 'كوكتيل طبقات', 'Layer Cocktail', 1.75),
      item('mix-cocktail', 'كوكتيل مكس', 'Mix Cocktail', 1.5),
      item('harbor-mix', 'هاربر ميكس', 'Harbor Mix', 2),
      item('mojito', 'موهيتو', 'Mojito', 1.75),
    ],
  },
  {
    id: 'cold-coffee',
    group: { ar: 'مشروبات', en: 'Beverages' },
    name: { ar: 'قهوة باردة', en: 'Cold Coffee' },
    items: [
      item('ice-coffee', 'آيس كوفي', 'Ice Coffee', 1.25),
      item('ice-latte', 'آيس لاتيه', 'Ice Latte', 1.25),
      item('ice-caramel', 'آيس كراميل', 'Ice Caramel', 1.25),
      item('ice-mocha', 'آيس موكا', 'Ice Mocha', 1.25),
      item('spanish-latte', 'سبانيش لاتيه', 'Spanish Latte', 1.25),
    ],
  },
  {
    id: 'cold-drinks',
    group: { ar: 'مشروبات', en: 'Beverages' },
    name: { ar: 'مشروبات باردة', en: 'Cold Drinks' },
    items: [
      item('sprite-mojito', 'سبرايت موهيتو', 'Sprite Mojito', 1.75),
      item('super-sauce', 'سوبر صوص', 'Super Sauce', 1.25),
      item('cold-turmeric', 'كركم', 'Turmeric', 1),
      item('cold-ginger', 'زنجبيل', 'Ginger', 1),
      item('flash', 'فلاش', 'Flash', 1),
      item('super', 'سوبر', 'Super', 1),
      item('add-syrup', 'إضافة سيرب', 'Add Syrup', 0.25),
    ],
  },
  {
    id: 'hot-coffee',
    group: { ar: 'مشروبات', en: 'Beverages' },
    name: { ar: 'قهوة حارة', en: 'Hot Coffee' },
    items: [
      item('americano', 'امريكان كوفي', 'American Coffee', 1.25),
      item('cappuccino', 'كابتشينو', 'Cappuccino', 1.25),
      item('hot-chocolate', 'هوت شوكولات', 'Hot Chocolate', 1),
      item('cafe-latte', 'كافية لاتية', 'Cafe Latte', 1.25),
      item('espresso', 'اسبريسو سنجل', 'Espresso', 1),
      item('double-espresso', 'دبل اسبريسو', 'Double Espresso', 1.25),
      item('turkish-coffee', 'قهوة تركي', 'Turkish Coffee', 1),
      item('double-turkish', 'قهوة تركي دبل', 'Double Turkish Coffee', 1.25),
      item('french-coffee', 'قهوة فرنسي', 'French Coffee', 1),
      item('double-french', 'قهوة فرنسي دبل', 'Double French Coffee', 1.25),
      item('hazelnut-coffee', 'قهوة بندق', 'Hazelnut Coffee', 1),
      item('double-hazelnut', 'قهوة بندق دبل', 'Double Hazelnut Coffee', 1.25),
      item('arabic-cup', 'كوب دلة عربي', 'Arabic Dallah Cup', 1),
    ],
  },
  {
    id: 'hot-drinks',
    group: { ar: 'مشروبات', en: 'Beverages' },
    name: { ar: 'مشروبات حارة', en: 'Hot Drinks' },
    items: [
      item('tea', 'شاي عادي', 'Tea', 0.5),
      item('green-tea', 'شاي أخضر', 'Green Tea', 0.5),
      item('large-tea', 'شاي كبير', 'Large Tea', 0.75),
      item('milk-tea', 'شاي حليب', 'Tea with Milk', 1),
      item('small-pot-tea', 'شاي غوري صغير', 'Small Pot Tea', 1.25),
      item('large-pot-tea', 'شاي غوري كبير', 'Large Pot Tea', 1.5),
      item('small-karak-pot', 'غوري شاي كرك صغير', 'Small Karak Tea Pot', 1.5),
      item('large-karak-pot', 'غوري شاي كرك كبير', 'Large Karak Tea Pot', 2),
      item('royal-tea', 'شاي ملكي', 'Royal Tea', 0.5),
      item('boiled-lomi', 'لومي مغلي', 'Boiled Lomi', 0.5),
      item('boiled-mint', 'نعناع مغلي', 'Boiled Mint', 0.5),
      item('boiled-lemon', 'ليمون مغلي', 'Boiled Lemon', 0.5),
      item('anise', 'يانسون', 'Anise', 0.5),
      item('chamomile', 'بابونج', 'Chamomile', 0.5),
      item('boiled-thyme', 'زعتر مغلي', 'Boiled Thyme', 0.75),
      item('sage', 'مرمرية', 'Sage', 0.5),
      item('herbal-flowers', 'زهورات', 'Herbal Flowers', 0.5),
      item('cinnamon', 'دارسين', 'Cinnamon', 0.5),
      item('three-mix', 'ثري مكس', 'Three Mix', 1),
      item('four-mix', 'فور مكس', 'Four Mix', 1.25),
      item('hot-milk', 'حليب حار', 'Hot Milk', 0.75),
      item('herbal-milk', 'حليب أعشاب', 'Herbal Milk', 1),
      item('hot-hibiscus', 'كركديه حار', 'Hot Hibiscus', 0.5),
      item('arabic-dallah', 'دله عربي', 'Arabic Dallah', 2),
      item('hot-ginger', 'زنجبيل', 'Ginger', 0.5),
      item('sahlab', 'سحلب', 'Sahlab', 1.5),
      item('nescafe', 'نسكافيه', 'Nescafe', 1),
      item('nescafe-milk', 'نسكافيه حليب', 'Nescafe with Milk', 1.25),
    ],
  },
  {
    id: 'ice-cream',
    group: { ar: 'مشروبات', en: 'Beverages' },
    name: { ar: 'مثلجات', en: 'Ice Cream' },
    items: [
      item('ice-cream-item', 'آيس كريم', 'Ice Cream', 1.5),
      item('samadi', 'صمدي', 'Samadi', 2),
      item('add-ice-cream', 'إضافة آيس كريم', 'Add Ice Cream', 0.5),
    ],
  },
  {
    id: 'juices',
    group: { ar: 'مشروبات', en: 'Beverages' },
    name: { ar: 'العصائر', en: 'Juices' },
    items: [
      item('kiwi', 'كيوي', 'Kiwi', 1.5),
      item('pineapple', 'أناناس', 'Pineapple', 1.5),
      item('strawberry-juice', 'فراولة', 'Strawberry', 1.25),
      item('mango', 'مانجو', 'Mango', 1.5),
      item('watermelon', 'رقي', 'Watermelon', 1.5),
      item('melon', 'شمام', 'Melon', 1.25),
      item('lemon-mint', 'ليمون نعناع', 'Lemon Mint', 1.25),
      item('carrot', 'جزر', 'Carrot', 1.25),
      item('orange-carrot', 'برتقال جزر', 'Orange Carrot', 1.75),
      item('lemon-carrot', 'ليمون جزر', 'Lemon Carrot', 1.5),
      item('orange', 'برتقال', 'Orange', 1.25),
      item('cold-milk', 'حليب بارد', 'Cold Milk', 1),
      item('banana-milk', 'حليب موز', 'Banana Milk', 1.25),
      item('orange-lemon', 'برتقال ليمون', 'Orange Lemon', 1.5),
      item('apple', 'تفاح', 'Apple', 1.5),
      item('avocado', 'أفوكادو', 'Avocado', 1.75),
      item('avocado-special', 'افوكادو اسبيشل', 'Avocado Special', 2.25),
      item('pomegranate', 'رمان', 'Pomegranate', 1.5),
      item('vimto', 'فيمتو', 'Vimto', 1),
      item('cold-jujube', 'عناب بارد', 'Cold Jujube', 1.25),
      item('juice-layer-cocktail', 'كوكتيل طبقات', 'Layer Cocktail', 1.75),
      item('juice-mix-cocktail', 'كوكتيل مكس', 'Mix Cocktail', 1.5),
      item('banana', 'موز', 'Banana', 1.25),
      item('bizan', 'بيذان', 'Bizan', 1.25),
    ],
  },
  {
    id: 'milkshake',
    group: { ar: 'مشروبات', en: 'Beverages' },
    name: { ar: 'ميلك شيك', en: 'Milk Shake' },
    items: [
      item('vanilla', 'فانيلا', 'Vanilla', 1.5),
      item('chocolate', 'شوكولاتة', 'Chocolate', 1.5),
      item('strawberry-shake', 'فراولة', 'Strawberry', 1.5),
      item('oreo', 'أوريو', 'Oreo', 1.5),
      item('snickers-shake', 'سنيكرز', 'Snickers', 1.75),
    ],
  },
  {
    id: 'water',
    group: { ar: 'مشروبات', en: 'Beverages' },
    name: { ar: 'مياه معدنية', en: 'Mineral Water' },
    items: [
      item('small-water', 'مياه صغير', 'Small Water', 0.25),
      item('small-italian-water', 'مياه إيطالي صغير', 'Small Italian Water', 0.5),
      item('large-italian-water', 'مياه إيطالي كبير', 'Large Italian Water', 1),
    ],
  },
  {
    id: 'soft-drinks',
    group: { ar: 'مشروبات', en: 'Beverages' },
    name: { ar: 'مشروبات غازية', en: 'Soft Drinks' },
    items: [
      item('cola', 'كولا بأنواعها', 'Cola, All Kinds', 0.35),
      item('kinza', 'كنزة بأنواعها', 'Kinza, All Kinds', 0.35),
      item('cherry-cola', 'شيري كولا', 'Cherry Cola', 0.75),
      item('barbican', 'بيبكان بأنواعها', 'Barbican, All Kinds', 0.75),
      item('perrier', 'مياه بيرييه', 'Perrier Water', 1),
      item('ice-tea', 'آيس تي بأنواعه', 'Ice Tea, All Kinds', 0.75),
    ],
  },
  {
    id: 'sweets',
    group: { ar: 'حلويات', en: 'Sweets' },
    name: { ar: 'حلويات', en: 'Sweets' },
    items: [
      item('flake', 'فليك', 'Flake', 1.75),
      item('snickers-sweet', 'سنيكرز', 'Snickers', 1.75),
      item('kunafa', 'كنافة', 'Kunafa', 1.75),
      item('saffron-cake', 'كيك زعفران', 'Saffron Cake', 1.75),
      item('fruit-salad', 'فروت سلات', 'Fruit Salad', 1.5),
      item('small-fruit-plate', 'طبق فواكه صغير', 'Small Fruit Plate', 1.5),
      item('medium-fruit-plate', 'طبق فواكه وسط', 'Medium Fruit Plate', 2),
      item('large-fruit-plate', 'طبق فواكه كبير', 'Large Fruit Plate', 2.5),
      item('small-nuts', 'طبق مكسرات صغير', 'Small Nuts Platter', 1),
      item('large-nuts', 'طبق مكسرات كبير', 'Large Nuts Platter', 2),
    ],
  },
  {
    id: 'shisha',
    group: { ar: 'الشيشة', en: 'Shisha' },
    name: { ar: 'الشيشة', en: 'Shisha' },
    items: [
      item('zaghloul', 'شيشة زغلول', 'Shisha Zaghloul', 1, 'تبديل رأس 0.750 د.ك', 'Head change 0.750 KWD'),
      item('qas', 'شيشة قص', 'Shisha Qas', 1, 'تبديل رأس 0.750 د.ك', 'Head change 0.750 KWD'),
      item('saloum', 'شيشة سلوم', 'Shisha Saloum', 1, 'تبديل رأس 0.750 د.ك', 'Head change 0.750 KWD'),
      item('shisha-hose', 'هوز طبي', 'Hose', 0.25),
    ],
  },
  {
    id: 'hookah',
    group: { ar: 'الشيشة', en: 'Shisha' },
    name: { ar: 'شيشة وكا', en: 'Hookah Shisha' },
    items: [
      ...shishaFlavors.map(([ar, en], index) => item(`hookah-${index}`, `شيشة وكا ${ar}`, `Hookah ${en}`, 2.5, 'تبديل رأس 1.500 د.ك', 'Head change 1.500 KWD')),
      item('hookah-hose', 'هوز طبي', 'Hose', 0.25),
    ],
  },
  {
    id: 'fruit-shisha',
    group: { ar: 'الشيشة', en: 'Shisha' },
    name: { ar: 'شيشة فواكة', en: 'Fruit Shisha' },
    items: [
      ...shishaFlavors.map(([ar, en], index) => item(`fruit-shisha-${index}`, `شيشة ${ar}`, `Shisha ${en}`, 2.25, 'تبديل رأس 1.250 د.ك', 'Head change 1.250 KWD')),
      item('fruit-shisha-hose', 'هوز طبي', 'Hose', 0.25),
      item('extra-tobacco', 'زيادة معسل', 'Extra Tobacco', 0.25),
    ],
  },
];

export const cloneDefaultMenu = (): MenuSection[] => JSON.parse(JSON.stringify(defaultMenu));
