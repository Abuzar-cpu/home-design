/* --------------------------------------------------------------- language */
const AZ = {
  'Ground floor': 'Birinci mərtəbə', 'Upper floor': 'İkinci mərtəbə', '8.6 × 11.9 m · walls 400 / 200 mm · ceiling 2.8 m': '8,6 × 11,9 m · divarlar 400 / 200 mm · tavan 2,8 m',
  'Start tour': 'Turu başlat', 'Stop tour': 'Turu dayandır', 'Mute music': 'Musiqini söndür', 'Unmute music': 'Musiqini aç', 'Dollhouse view': 'Maket görünüşü', 'Walk view': 'Gəzinti görünüşü',
  'Show upper floor': 'İkinci mərtəbəni göstər', 'Show ground floor': 'Birinci mərtəbəni göstər',
  'Modern': 'Modern', 'Scandinavian': 'Skandinav', 'Warm luxury': 'İsti lüks', 'Loft': 'Loft',
  'Time': 'Vaxt', 'Morning': 'Səhər', 'Midday': 'Günorta', 'Afternoon': 'Günortadan sonra', 'Sunset': 'Gün batımı', 'Night': 'Gecə',
  'Click': 'Klik', 'look around with the mouse': 'siçanla ətrafa baxın', 'walk, hold Shift to go faster': 'gəzin, sürətli getmək üçün Shift saxlayın', 'change the interior style': 'interyer üslubunu dəyişin',
  'drag the slider from morning to night': 'sürgünü səhərdən gecəyə çəkin', 'switch to the dollhouse view': 'maket görünüşünə keçin', 'Stairs': 'Pilləkən', 'walk onto them to go up or down': 'qalxmaq və ya enmək üçün üstünə gedin',
  'sit back for a guided walk with music': 'musiqili bələdçi gəzintisinə baxın', 'Left pad': 'Sol dairə', 'walk': 'gəzin', 'Drag': 'Sürüşdürün', 'look around': 'ətrafa baxın',
  'The 3D library did not load. Check your connection and reload the page.': '3D kitabxana yüklənmədi. İnternet bağlantınızı yoxlayıb səhifəni yeniləyin.',
  'Living + dining': 'Qonaq otağı + yemək zonası', 'Guest / study': 'Qonaq / iş otağı', 'Bathroom': 'Hamam', 'WC': 'Tualet', 'Lobby': 'Ön otaq', 'Kitchen': 'Mətbəx', 'Stair': 'Pilləkən', 'Hall': 'Koridor', 'Porch': 'Artırma',
  'Entrance steps': 'Giriş pillələri', 'Bedroom': 'Yataq otağı', 'Clothing room': 'Geyim otağı', 'En-suite': 'Fərdi hamam', "Baby's room": 'Körpə otağı', 'Gaming room': 'Oyun otağı', 'Upper hall': 'Üst koridor', 'Balcony': 'Balkon',
  'Living room': 'Qonaq otağı', 'Dining area': 'Yemək zonası', 'Front yard': 'Həyət', 'Walk up the steps to the front door': 'Pillələrlə giriş qapısına qalxın',
  'roof off': 'damsız', 'Drag to turn, pinch or scroll to zoom, tap a room to walk there': 'Döndərmək üçün sürüşdürün, böyütmək üçün çimdikləyin və ya çarxı fırladın, otağa toxunub ora keçin',
  '18 risers': '18 pillə', '9 risers up to the porch': 'artırmaya 9 pillə',
  'Covered entry with room for two chairs': 'İki kreslo üçün yeri olan örtülü giriş', 'One central hall reaches every room directly': 'Mərkəzi koridordan bütün otaqlara birbaşa keçid',
  'Walk-in shower with a daylight window': 'Gün işığı düşən pəncərəli duş kabinəsi', 'Separate guest WC off its own lobby': 'Öz ön otağından girişli ayrıca qonaq tualeti',
  'Walnut and cream kitchen: an island with two stools and a pull-out table, the sink under the front window': 'Qoz və krem rəngli mətbəx: iki oturacaqlı ada, çəkilib açılan masa, ön pəncərənin altında çanaq', 'Twin guest room with a wardrobe and a writing desk': 'İki ayrı çarpayısı, şkafı və yazı masası olan qonaq otağı',
  'Nearly 8 m of open living space with two windows': 'İki pəncərəli, təxminən 8 metrlik açıq qonaq sahəsi', 'Seats six beside the rear window': 'Arxa pəncərənin yanında altı nəfərlik süfrə',
  'Part of the 31.2 m² living space': '31,2 m² qonaq sahəsinin bir hissəsi', 'Main bedroom with a walk-in wardrobe and en-suite': 'Geyim otağı və fərdi hamamı olan əsas yataq otağı', 'Walk-in shower, bath and double basin': 'Açıq duş, vanna və qoşa lavabo',
  'Walk-in wardrobe with a window, leading to the en-suite': 'Fərdi hamama aparan pəncərəli geyim otağı', 'Two windows, a few steps from the main bedroom': 'İki pəncərə, əsas yataq otağından bir neçə addım',
  'Set apart from the bedrooms for late nights': 'Gecə oyunları üçün yataq otaqlarından aralı', 'Full-width balcony over the front garden': 'Ön bağçaya baxan, evin bütün eni boyu balkon',
  'The whole home': 'Bütün ev', 'About 161 m² inside, over two floors': 'İki mərtəbədə təxminən 161 m² daxili sahə', 'Plus the full-width balcony and the covered porch': 'Üstəlik bütün en boyu balkon və örtülü artırma'
};
let lang = 'en';
try { const sv = localStorage.getItem('tour-lang'); if (sv === 'az' || sv === 'en') lang = sv; else if ((navigator.language || '').toLowerCase().indexOf('az') === 0) lang = 'az'; } catch (e) { }
const tr = k => lang === 'az' && AZ[k] !== undefined ? AZ[k] : k;
// dimension strings: decimal comma and translated riser notes in Azerbaijani
const fd = d => lang !== 'az' ? d : d.replace('9 risers up to the porch', AZ['9 risers up to the porch']).replace('18 risers', AZ['18 risers']).replace(/(\d)\.(\d)/g, '$1,$2');

