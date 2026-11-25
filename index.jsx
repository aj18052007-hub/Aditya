import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  MapPin,
  Compass,
  Clock,
  Landmark,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  X,
  Menu,
  BookOpen,
  Award,
  Layers,
  Sun,
  Volume2,
  Play,
  Square,
  Eye,
  Info,
  GraduationCap,
  Users,
  ScrollText,
  ZoomIn,
  Calendar,
  Hammer,
  Building2,
  Music,
  CheckCircle2
} from 'lucide-react';

/* ============================================================================
   UTILITY: VERIFIED WIKIMEDIA COMMONS HIGH-RES IMAGE URL BUILDER
   ============================================================================ */
const wikiImg = (filename, width = 1280) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=${width}`;

/* ============================================================================
   DATA: 10 FEATURED INDIAN MONUMENTS (HISTORICALLY VERIFIED)
   ============================================================================ */
const MONUMENTS = [
  {
    id: 'keshava-somnathapura',
    name: 'Keshava Temple',
    location: 'Somnathapura, Karnataka',
    state: 'Karnataka',
    region: 'Mysuru District, Banks of River Kaveri',
    categories: ['Temples', 'Architecture'],
    era: '13th Century CE',
    year: '1258 CE',
    builtBy: 'Somanatha Dandanayaka (General under Hoysala King Narasimha III)',
    architecturalStyle: 'Hoysala Architecture (Trikuta Stellate Vesara)',
    materials: 'Fine-grained Chloritic Schist (Soapstone)',
    silhouetteType: 'hoysala',
    heroImage: wikiImg('Chennakeshava_Temple,_Somnath_Pura.jpg', 1400),
    fallbackImage: wikiImg('View_of_the_Chennakeshava_temple_at_Somanathapura.jpg', 1200),
    shortDesc:
      'A symmetrical star-shaped Hoysala masterpiece carved in soapstone, renowned for its three shrines and intricate epic friezes.',
    historicalBackground:
      'Constructed in 1258 CE by Somanatha Dandanayaka, a prominent general in the court of Hoysala Emperor Narasimha III, the Keshava Temple (also called Chennakeshava Temple) was the centerpiece of the newly established agrahara town of Somanathapura on the banks of the River Kaveri. Consecrated as a Vaishnava sanctuary, it represents the culmination of mature Hoysala architectural geometry and sculptural virtuosity.',
    about:
      'Set within a walled courtyard lined with 64 peripheral pillared cells, the temple stands upon a raised star-shaped platform (jagati) designed for circumambulation (pradakshina). Unlike single-shrine temples, Keshava Temple follows a rare trikuta (triple-shrine) configuration, housing sanctums for Keshava (originally in the west), Janardhana (north), and Venugopala (south), all opening into a shared lathe-turned pillared navaranga hall.',
    uniqueFeatures: [
      {
        title: '16-Pointed Stellate (Star) Plan',
        detail:
          'Each shrine projects outward in rotated geometric squares, creating a 16-pointed star plan that maximizes wall surface for light, shadow, and dense carving.'
      },
      {
        title: 'Raised Jagati Platform',
        detail:
          'The temple sits on a matching stellate stone terrace approximately 3 feet high, allowing devotees to circumambulate closely around the narrative bands.'
      },
      {
        title: 'Lathe-Turned Bell Pillars & Domed Ceilings',
        detail:
          'The interior navaranga features mirror-polished, lathe-turned soapstone pillars supporting 16 uniquely carved inverted-lotus ceiling bays.'
      },
      {
        title: 'Six Horizontal Molding Friezes',
        detail:
          'Continuous bands along the base depict marching elephants, cavalry, floral scrolls, mythical makaras, swans (hamsas), and episodes from the Ramayana, Mahabharata, and Bhagavata Purana.'
      }
    ],
    sculptures:
      'Over 190 major wall panels portray Vishnu avatars, Lakshmi, Saraswati, Mahishasuramardini, and celestial musicians. Master sculptors such as Mallitamma proudly signed their names below individual panels, providing rare historical records of medieval Indian guilds.',
    significance:
      'Inscribed in 2023 as part of the UNESCO World Heritage "Sacred Ensembles of the Hoysalas", the Keshava Temple stands as an extraordinary record of geometric precision, collaborative guild craftsmanship, and narrative stone artistry.',
    timeline: [
      { year: '1258 CE', event: 'Commissioned & consecrated by Somanatha Dandanayaka under Narasimha III' },
      { year: '13th–14th C.', event: 'Inscriptions record royal endowments for temple upkeep and learning' },
      { year: '20th C.', event: 'Protected and conserved by the Archaeological Survey of India (ASI)' },
      { year: '2023', event: 'Inscribed as a UNESCO World Heritage Site (Sacred Ensembles of the Hoysalas)' }
    ],
    gallery: [
      {
        url: wikiImg('Chennakeshava_Temple,_Somnath_Pura.jpg', 1200),
        caption: 'Stellate exterior and triple shikharas of Keshava Temple, Somnathapura'
      },
      {
        url: wikiImg('View_of_the_Chennakeshava_temple_at_Somanathapura.jpg', 1200),
        caption: 'Panoramic view across the raised jagati courtyard platform'
      },
      {
        url: wikiImg('Chennakesava_temple,_Somanathapura.jpg', 1000),
        caption: 'Sacred geometric trikuta floor plan derived from rotated squares and circles'
      }
    ],
    mapCoords: { x: 169, y: 460 }
  },
  {
    id: 'sundara-kamakshi-tamilnadu',
    name: 'Sundara Kamakshi Temple',
    location: 'Tamil Nadu',
    state: 'Tamil Nadu',
    region: 'Classical Dravidian Shakti Heritage, Tamil Nadu',
    categories: ['Temples', 'Architecture'],
    era: 'Classical Medieval Dravidian Era',
    year: 'Pallava–Chola–Vijayanagara Traditions',
    builtBy: 'Patronized across Classical South Indian Dynasties',
    architecturalStyle: 'Dravidian Temple Architecture',
    materials: 'Dressed Granite, Lime Stucco (Sudhai) & Copper-Gilded Kalashas',
    silhouetteType: 'dravidian',
    heroImage: wikiImg('One_of_the_four_entrance_gopurams_of_Kamakshi_Amman_Temple,_Kanchipuram.jpg', 1400),
    fallbackImage: wikiImg('2017-03-Kamakshi_Temple_Gopurams_1_small.jpg', 1200),
    shortDesc:
      'A revered Shakti sanctuary exemplifying classical Tamil Dravidian architecture, towering gopurams, and sculpted granite mandapas.',
    historicalBackground:
      'Rooted in Tamil Nadu’s centuries-old Shakta and Agama temple traditions, sanctuaries dedicated to Goddess Kamakshi reflect the architectural evolution spanning Pallava foundations, Chola structural mastery, and Vijayanagara–Nayaka pillared expansions. These temples served not only as centers of devotion to the Divine Mother (Devi) but also as vibrant hubs of classical music, Sanskrit and Tamil scholarship, and community patronage.',
    about:
      'Built according to traditional Vastu Shastra and Agama geometric canons, the temple complex transitions worshippers from the bustling outer gateway through concentric prakarams (enclosures) toward the serene, dimly lit garbhagriha (sanctum sanctorum). Soaring pyramidal gopurams covered in vibrant iconographic stucco mark the cardinal approaches, while cool granite mandapas frame ritual corridors.',
    uniqueFeatures: [
      {
        title: 'Tiered Pyramidal Gopurams',
        detail:
          'Multi-storeyed entrance towers crowned by barrel-vaulted shala roofs and sacred kalashas, displaying layered niches of deities and guardian spirits.'
      },
      {
        title: 'Concentric Prakaram Enclosures',
        detail:
          'Nested rectangular courtyards with stone-paved circumambulatory walkways engineered to manage festival gatherings and natural cross-ventilation.'
      },
      {
        title: 'Carved Granite Pillared Mandapas',
        detail:
          'Monolithic granite columns bearing corbelled pushpa-potika (lotus-bud) brackets, yali motifs, and rhythmic sculptural reliefs.'
      },
      {
        title: 'Sacred Garbhagriha & Vimana',
        detail:
          'The central sanctum housing the serene seated form of Goddess Kamakshi, surmounted by a proportional Dravidian vimana.'
      }
    ],
    sculptures:
      'Notable iconographic works include graceful Devi reliefs, Dwarapalikas (female temple guardians), lotus medallions on stone ceilings, and expressive classical dance postures along the mandapa columns.',
    significance:
      'Embodying living Dravidian architectural heritage, the Kamakshi temple tradition preserves unbroken ritual liturgy, temple proportion science (Talamana), and South Indian granite engineering across generations.',
    timeline: [
      { year: '6th–9th C. CE', event: 'Early Pallava stone temple traditions establish Dravidian architectural grammar' },
      { year: '10th–13th C.', event: 'Chola refinements elevate granite vimana proportions and bronze iconography' },
      { year: '14th–17th C.', event: 'Vijayanagara & Nayaka expansions add grand entrance gopurams and pillared halls' },
      { year: 'Present Day', event: 'Continues as a vibrant living monument of Shakti devotion and Tamil heritage' }
    ],
    gallery: [
      {
        url: wikiImg('One_of_the_four_entrance_gopurams_of_Kamakshi_Amman_Temple,_Kanchipuram.jpg', 1200),
        caption: 'Soaring multi-tiered Dravidian entrance gopuram rich in sacred iconography'
      },
      {
        url: wikiImg('2017-03-Kamakshi_Temple_Gopurams_1_small.jpg', 1200),
        caption: 'Architectural alignment of temple towers and inner prakaram enclosures'
      }
    ],
    mapCoords: { x: 209, y: 450 }
  },
  {
    id: 'vijaya-vittala-hampi',
    name: 'Vijaya Vittala Temple',
    location: 'Hampi, Karnataka',
    state: 'Karnataka',
    region: 'Vijayanagara District, Southern Bank of Tungabhadra',
    categories: ['Temples', 'Architecture', 'Monuments'],
    era: '15th–16th Century CE',
    year: 'c. 1422–1565 CE',
    builtBy: 'Deva Raya II; expanded by Krishnadevaraya & Achyuta Deva Raya',
    architecturalStyle: 'Vijayanagara Architecture',
    materials: 'Local Coarse-Grained Vijayanagara Granite',
    silhouetteType: 'chariot',
    heroImage: wikiImg('Stone_Chariot_Vittala_Temple.jpg', 1400),
    fallbackImage: wikiImg('Stone_Chariot_at_Vittala_temple,_Hampi.jpg', 1200),
    shortDesc:
      'Pinnacle of Vijayanagara artistry, celebrated worldwide for its iconic monolithic-look Stone Chariot and 56 resonant musical granite pillars.',
    historicalBackground:
      'Dedicated to Lord Vittala (an incarnation of Vishnu widely revered in Maharashtra and Karnataka), the Vijaya Vittala Temple was originally begun during the reign of Deva Raya II (1422–1446 CE) and magnificently expanded in the 16th century under Emperor Krishnadevaraya and his successors. It stood as the ceremonial jewel of Vijayanagara, one of the wealthiest and largest metropolises of the medieval world.',
    about:
      'Approached via a grand colonnaded chariot street (Vittala Bazaar), the walled temple compound integrates a Maha Mandapa (Ranga Mandapa), Kalyana Mandapa, Utsava Mandapa, and the celebrated Garuda Shrine sculpted in the form of a temple chariot. Despite granite being notoriously difficult to carve, Vijayanagara artisans sculpted delicate floral scrolls, rearing yalis, and acoustically tuned colonnettes.',
    uniqueFeatures: [
      {
        title: 'The Iconic Stone Chariot (Garuda Shrine)',
        detail:
          'Built from interlocked granite blocks with concealed joints so seamless it appears monolithic; originally crowned by a brick-and-mortar shikhara, with finely carved stone wheels.'
      },
      {
        title: '56 Musical Pillars (SaReGaMa Pillars)',
        detail:
          'Located inside the Ranga Mandapa, massive composite granite pillars surround central shafts with slender colonnettes that emit distinct musical notes when tapped.'
      },
      {
        title: 'Composite Vijayanagara Columns',
        detail:
          'Single-block granite piers carved into rearing mythical yalis, royal horses, musicians, and dancers supporting expansive stone ceiling beams.'
      },
      {
        title: 'Vittala Bazaar & Pushkarini',
        detail:
          'A nearly one-kilometer ceremonial avenue flanked by stone pavilions and a stepped temple tank demonstrating integrated urban planning.'
      }
    ],
    sculptures:
      'Highlights include the twin stone elephants drawing the Garuda Chariot (replacing earlier prancing horses), intricate Dashavatara reliefs, foreign horse traders depicted in royal friezes, and musicians carved into the Ranga Mandapa plinth.',
    significance:
      'Part of the UNESCO World Heritage Group of Monuments at Hampi, Vijaya Vittala Temple is a world-renowned testament to acoustic stone engineering, granite joinery, and Vijayanagara cultural synthesis.',
    timeline: [
      { year: 'c. 1422–1446 CE', event: 'Core temple founded under Emperor Deva Raya II' },
      { year: '1509–1529 CE', event: 'Emperor Krishnadevaraya commissions the Ranga Mandapa & Stone Chariot' },
      { year: '1554 CE', event: 'Swinging Pavilion and grand ornamental halls completed' },
      { year: '1986', event: 'Inscribed as a UNESCO World Heritage Site (Group of Monuments at Hampi)' }
    ],
    gallery: [
      {
        url: wikiImg('Stone_Chariot_Vittala_Temple.jpg', 1200),
        caption: 'The iconic Stone Chariot (Garuda Shrine) facing the main Vittala sanctum'
      },
      {
        url: wikiImg('Musical_Pillars_Hampi.jpg', 1200),
        caption: 'Composite granite musical pillars inside the Ranga Mandapa'
      },
      {
        url: wikiImg('Stone_Chariot_at_Vittala_temple,_Hampi.jpg', 1200),
        caption: 'Intricate stone wheels and base frieze detailing of the ceremonial ratha'
      }
    ],
    mapCoords: { x: 171, y: 402 }
  },
  {
    id: 'chennakeshava-belur',
    name: 'Chennakeshava Temple',
    location: 'Belur, Karnataka',
    state: 'Karnataka',
    region: 'Hassan District, Banks of River Yagachi',
    categories: ['Temples', 'Architecture'],
    era: '12th Century CE',
    year: '1117 CE (103 Years of Refinement)',
    builtBy: 'Hoysala King Vishnuvardhana',
    architecturalStyle: 'Early Mature Hoysala Architecture (Ekakuta)',
    materials: 'Soft-Quarried Chloritic Schist (Hardens on Exposure)',
    silhouetteType: 'hoysala',
    heroImage: wikiImg('ChennaKeshava_Temple,_Belur.JPG', 1400),
    fallbackImage: wikiImg('Belur,_Chennakeshava_Temple_(9882102615).jpg', 1200),
    shortDesc:
      'Commissioned in 1117 CE by King Vishnuvardhana, famous for its 42 expressive Madanika bracket sculptures and lathe-turned stone pillars.',
    historicalBackground:
      'Commissioned in 1117 CE by Hoysala monarch Vishnuvardhana to commemorate his historic victory over the Chola Empire at Talakadu, the Chennakeshava (originally Vijayanarayana) Temple at Belur took over a century across three generations to reach full sculptural completion. It remains an active house of worship after more than 900 years.',
    about:
      'Constructed on a broad stellate jagati platform, this ekakuta (single-sanctum) temple is celebrated for the extraordinary freedom and polish of its soapstone sculpture. Quarried when relatively soft, chloritic schist enabled artisans to achieve ivory-like undercutting and filigree jewelry details before the stone hardened over time on atmospheric exposure.',
    uniqueFeatures: [
      {
        title: '42 Madanika (Shilabalika) Bracket Figures',
        detail:
          '38 exterior and 4 interior celestial bracket sculptures poised beneath the eaves, depicting dancers, drummers, huntresses, and maidens looking into mirrors.'
      },
      {
        title: 'Narasimha & Mohini Pillars',
        detail:
          'Inside the dark navaranga hall stands the intricately carved Narasimha Pillar (historically engineered with ball-bearing-like pivot alignment) and the graceful Mohini Pillar.'
      },
      {
        title: 'Perforated Stone Screens (Jali)',
        detail:
          '20 intricately pierced geometric and Puranic narrative stone screens filter natural daylight into the pillared hall.'
      },
      {
        title: 'Signed Guild Masterpieces',
        detail:
          'Renowned sculptors like Dasoja and Chavana of Balligavi inscribed their signatures directly onto pedestals of their Madanika figures.'
      }
    ],
    sculptures:
      'Iconic works include Darpana Sundari (Lady with Mirror), Bhasma Mohini, Shuka Bhashini (Maiden with Parrot), the dynamic Hoysala Royal Emblem (Sala slaying the lion/tiger), and the towering Garuda statue in the courtyard.',
    significance:
      'Inscribed in 2023 as a UNESCO World Heritage Site alongside Halebidu and Somnathapura, Belur’s Chennakeshava Temple marks a golden apex in Indian temple sculpture, dance iconography, and structural stone turning.',
    timeline: [
      { year: '1117 CE', event: 'Consecrated by King Vishnuvardhana following the victory at Talakadu' },
      { year: '1117–1220 CE', event: 'Generations of master artisans complete interior pillars, screens & Madanikas' },
      { year: '14th–16th C.', event: 'Vijayanagara rulers add the towering eastern Raya Gopuram & Garuda shrine' },
      { year: '2023', event: 'Inscribed as a UNESCO World Heritage Site (Sacred Ensembles of the Hoysalas)' }
    ],
    gallery: [
      {
        url: wikiImg('ChennaKeshava_Temple,_Belur.JPG', 1200),
        caption: 'Front elevation of Chennakeshava Temple raised on its carved jagati platform'
      },
      {
        url: wikiImg('Madanika_(Shilabalika)_carving_at_Chennakeshava_Temple,_Belur.jpg', 1000),
        caption: 'Exquisite Madanika (Shilabalika) bracket sculpture in chloritic schist'
      },
      {
        url: wikiImg('Hoysala_emblem_at_Belur.JPG', 1200),
        caption: 'The Hoysala Royal Emblem depicting Sala battling the mythical lion'
      }
    ],
    mapCoords: { x: 154, y: 444 }
  },
  {
    id: 'virupaksha-hampi',
    name: 'Virupaksha Temple',
    location: 'Hampi, Karnataka',
    state: 'Karnataka',
    region: 'Hemakuta Hill Foothills, Hampi',
    categories: ['Temples', 'Monuments'],
    era: '7th–16th Century CE',
    year: '7th Century Origins; 1509–1510 CE Expansion',
    builtBy: 'Chalukyan Foundations; Expanded by Lakkana Dandesha & Krishnadevaraya',
    architecturalStyle: 'Early Chalukya to Vijayanagara Dravidian Synthesis',
    materials: 'Granite Masonry, Brick & Lime Stucco Superstructure',
    silhouetteType: 'dravidian',
    heroImage: wikiImg('The_Gopuram_of_Virupaksha_Temple,_Hampi.jpg', 1400),
    fallbackImage: wikiImg('Gopuram_Of_Virupaksha_Temple_,_Hampi.JPG', 1200),
    shortDesc:
      'An unbroken center of worship since the 7th century, featuring a towering 9-tiered Raja Gopuram and a natural pinhole camera shadow effect.',
    historicalBackground:
      'Dedicated to Lord Virupaksha (a form of Shiva) and Goddess Pampadevi, this temple evolved from a modest 7th-century Chalukyan shrine into the spiritual anchor of the mighty Vijayanagara Empire. Emperor Krishnadevaraya celebrated his 1509–1510 CE coronation by constructing the grand central pillared hall (Ranga Mandapa) and renovating the majestic eastern gateway.',
    about:
      'Unlike many ruined monuments across Hampi, Virupaksha Temple has witnessed uninterrupted daily worship for over 1,300 years. Its architecture aligns along an east-west sacred axis stretching from the Hampi Bazaar through a 50-meter, nine-tiered eastern Raja Gopuram, an inner courtyard with a perennial stream diverted from the Tungabhadra, and into the main sanctum.',
    uniqueFeatures: [
      {
        title: 'Natural Pinhole Camera Optical Effect',
        detail:
          'Inside the dark rear chamber (Saalu Mandapa), a narrow aperture in the stone wall projects an inverted, clear shadow silhouette of the distant 9-tiered Raja Gopuram onto the opposite wall ~300 feet away.'
      },
      {
        title: '50-Meter Nine-Tiered Eastern Raja Gopuram',
        detail:
          'Built with a solid granite lower storey and tapered brick-and-stucco tiers adorned with geometric niches and sculpted pilasters.'
      },
      {
        title: 'Painted Ceiling of the Ranga Mandapa',
        detail:
          'Preserves rare Vijayanagara-era mineral-pigment murals illustrating the marriage of Shiva and Parvati, Tripurantaka, and Vidyaranya in royal procession.'
      },
      {
        title: 'Hydraulic Courtyard Channel',
        detail:
          'An ancient subterranean stone channel brings fresh water from the Tungabhadra River directly through the temple kitchen and courtyard.'
      }
    ],
    sculptures:
      'Features fierce rearing yalis along the Ranga Mandapa pillars, monolithic Nandi facing the sanctum along Hampi Bazaar, three-headed Nandi carvings, and finely modeled Shaivite reliefs.',
    significance:
      'As both an active spiritual sanctuary and a UNESCO World Heritage monument, Virupaksha Temple bridges over a millennium of South Indian dynasties while demonstrating remarkable mastery of sacred geometry, acoustics, and optics.',
    timeline: [
      { year: '7th Century CE', event: 'Original shrine established under the Badami Chalukyas' },
      { year: '14th Century', event: 'Expanded by Lakkana Dandesha under Vijayanagara rule' },
      { year: '1509–1510 CE', event: 'Krishnadevaraya builds the Ranga Mandapa & renovates the Raja Gopuram' },
      { year: 'Present Day', event: 'Over 1,300 years of continuous unbroken heritage and living worship' }
    ],
    gallery: [
      {
        url: wikiImg('The_Gopuram_of_Virupaksha_Temple,_Hampi.jpg', 1200),
        caption: 'The soaring 50-meter, nine-tiered Eastern Raja Gopuram of Virupaksha Temple'
      },
      {
        url: wikiImg('Gopuram_Of_Virupaksha_Temple_,_Hampi.JPG', 1200),
        caption: 'Granite base and intricately layered stucco tiers rising above Hampi Bazaar'
      }
    ],
    mapCoords: { x: 156, y: 410 }
  },
  {
    id: 'kailasa-ellora',
    name: 'Kailasa Temple (Cave 16)',
    location: 'Ellora, Maharashtra',
    state: 'Maharashtra',
    region: 'Chhatrapati Sambhajinagar District, Sahyadri Basalt Cliffs',
    categories: ['Temples', 'Architecture', 'Monuments'],
    era: '8th Century CE',
    year: 'c. 756–773 CE',
    builtBy: 'Rashtrakuta King Krishna I',
    architecturalStyle: 'Monolithic Top-Down Rock-Cut Architecture',
    materials: 'Single Solid Deccan Volcanic Basalt Cliff',
    silhouetteType: 'kailasa',
    heroImage: wikiImg('Kailasa_Temple_at_Ellora_Caves.jpg', 1400),
    fallbackImage: wikiImg('Kailasha_temple_at_ellora.JPG', 1200),
    shortDesc:
      'The world’s largest monolithic rock-cut structure—excavated top-down from a single basalt cliff by removing over 200,000 tonnes of solid rock.',
    historicalBackground:
      'Attributed primarily to Rashtrakuta Emperor Krishna I (reigned c. 756–773 CE), Cave 16 at Ellora—known as Kailasanatha or Kailasa Temple—was envisioned as an earthly manifestation of Mount Kailasha, the Himalayan abode of Lord Shiva. Copper-plate inscriptions record the awe of even its own master architect upon seeing the completed monolith.',
    about:
      'Rather than assembling stone blocks from the ground up, ancient Indian engineers employed a bold subtractive top-down technique: they cut three massive vertical trenches into the basalt plateau and sculpted the entire multi-storeyed temple—complete with gateway, Nandi pavilion, twin monolithic victory pillars (dhvajastambhas), life-sized elephants, bridges, courtyard galleries, and a 32-meter shikhara—from a single unbroken rock mass.',
    uniqueFeatures: [
      {
        title: 'Top-Down Subtractive Monolithic Engineering',
        detail:
          'Estimated 200,000 to 400,000 tonnes of dense Deccan basalt were precisely excavated using hammers, chisels, and zero structural margin for error.'
      },
      {
        title: 'Monumental Plinth of Carved Elephants',
        detail:
          'The main temple rests on an elevated adhishthana sculpted with life-size elephants and lions appearing to carry the entire mountain sanctuary on their backs.'
      },
      {
        title: 'Twin Monolithic Dhvajastambhas',
        detail:
          'Two towering 15-meter free-standing stone pillars carved directly out of the bedrock flank the Nandi Mandapa in the courtyard.'
      },
      {
        title: 'Multi-Storeyed Circumambulatory Galleries',
        detail:
          'Surrounding cliff walls are hollowed into dramatic pillared cloisters containing colossal Shaivite, Vaishnavite, and Shakta narrative panels.'
      }
    ],
    sculptures:
      'Home to the world-famous high-relief sculpture of Ravana Shaking Mount Kailasha (Ravananugraha), where Shiva calmly stabilizes the mountain with a single toe, alongside panels of Gajalakshmi, Nataraja, and carved friezes of the Ramayana and Mahabharata.',
    significance:
      'A centerpiece of the UNESCO World Heritage Ellora Caves, Kailasa Temple represents one of humanity’s boldest feats of three-dimensional spatial planning, geological mastery, and sculptural drama.',
    timeline: [
      { year: 'c. 756–773 CE', event: 'Main monolithic excavation directed under Rashtrakuta King Krishna I' },
      { year: '8th–9th C. CE', event: 'Surrounding rock-cut galleries & Lankeshwara shrine expanded' },
      { year: '1983', event: 'Ellora Caves inscribed as a UNESCO World Heritage Site' }
    ],
    gallery: [
      {
        url: wikiImg('Kailasa_Temple_at_Ellora_Caves.jpg', 1200),
        caption: 'Aerial perspective of the monolithic Kailasa Temple carved into the basalt cliff'
      },
      {
        url: wikiImg('Ravana_liftng_mount_Kailasa,_Ellora.jpg', 1000),
        caption: 'Dramatic Ravananugraha relief showing Ravana lifting Mount Kailasha'
      },
      {
        url: wikiImg('Kailasha_temple_at_ellora.JPG', 1200),
        caption: 'Courtyard view revealing the Dravidian-inspired shikhara and stone bridges'
      }
    ],
    mapCoords: { x: 144, y: 324 }
  },
  {
    id: 'jantar-mantar-jaipur',
    name: 'Jantar Mantar',
    location: 'Jaipur, Rajasthan',
    state: 'Rajasthan',
    region: 'Jaipur Historic City Core',
    categories: ['Astronomy', 'Architecture', 'Monuments'],
    era: '18th Century CE',
    year: '1728–1734 CE',
    builtBy: 'Maharaja Sawai Jai Singh II',
    architecturalStyle: 'Traditional Indian Astronomical Architecture',
    materials: 'Local Stone, White Makrana Marble & Calibrated Brass Scales',
    silhouetteType: 'jantar',
    heroImage: wikiImg('Jaipur-Jantar_Mantar-Brihat_Samrat_Yantra-20131016.jpg', 1400),
    fallbackImage: wikiImg('Jantar_Mantar,_Jaipur_-_Samrat_Yantra.jpg', 1200),
    shortDesc:
      'An open-air masonry astronomical observatory housing 19 giant stone instruments, including the world’s largest precision stone sundial.',
    historicalBackground:
      'Built between 1728 and 1734 CE by the scholar-king Maharaja Sawai Jai Singh II of Amber and Jaipur, Jantar Mantar (from Sanskrit "Yantra Mantra", meaning instrument of calculation) was the largest and best-preserved of five observatories he constructed across northern India. Dissatisfied with wear and small-scale errors in portable brass astrolabes, Jai Singh II scaled astronomical instruments to monumental masonry dimensions.',
    about:
      'Designed specifically for naked-eye positional astronomy, the 19 architectural yantras enable observers to measure local solar time, track celestial altitudes and azimuths, determine planetary declinations, forecast eclipses, and map zodiacal transits across the ecliptic, equatorial, and horizon coordinate systems.',
    uniqueFeatures: [
      {
        title: 'Vrihat Samrat Yantra (Supreme Sundial)',
        detail:
          'Standing 27 meters tall, its triangular gnomon is inclined precisely at 27° (Jaipur’s latitude) parallel to Earth’s rotational axis, reading local solar time to an extraordinary 2-second precision.'
      },
      {
        title: 'Jai Prakash Yantra',
        detail:
          'Two complementary sunken white-marble hemispherical bowls representing the inverted sky dome, with cross-wire shadow indicators mapping solar coordinates and zodiac signs.'
      },
      {
        title: 'Ram Yantra',
        detail:
          'Twin open-roofed cylindrical instruments with alternating radial stone sectors and graduated vertical walls used to measure solar altitude and azimuth directly.'
      },
      {
        title: 'Rashivalaya & Nadivalaya Yantras',
        detail:
          'Twelve zodiacal sundials aligned to the ecliptic plane and a dual-faced equatorial dial calibrated for northern and southern solar hemispheres.'
      }
    ],
    sculptures:
      'Rather than figurative sculpture, the monument’s visual poetry lies in razor-sharp geometric curves, inlaid Makrana marble arcs, finely engraved Devanagari numerical graduations, and monumental sunlit minimalism.',
    significance:
      'Inscribed as a UNESCO World Heritage Site in 2010, Jantar Mantar exemplifies the synthesis of ancient Siddhantic Indian astronomy, spherical trigonometry, and precision civil engineering.',
    timeline: [
      { year: '1727 CE', event: 'Maharaja Sawai Jai Singh II founds the planned city of Jaipur' },
      { year: '1728–1734 CE', event: 'Construction and calibration of the 19 astronomical yantras completed' },
      { year: '1901–1902', event: 'Major marble restoration preserving engraved graduation scales' },
      { year: '2010', event: 'Inscribed as a UNESCO World Heritage Site' }
    ],
    gallery: [
      {
        url: wikiImg('Jaipur-Jantar_Mantar-Brihat_Samrat_Yantra-20131016.jpg', 1200),
        caption: 'The 27-meter Vrihat Samrat Yantra gnomon and curved marble time quadrants'
      },
      {
        url: wikiImg('Jantar_Mantar,_Jaipur_-_Samrat_Yantra.jpg', 1200),
        caption: 'Precision architectural alignment of the equinoctial sundial staircase'
      }
    ],
    mapCoords: { x: 153, y: 202 }
  },
  {
    id: 'kirti-stambha-chittorgarh',
    name: 'Kirti Stambha',
    location: 'Chittorgarh, Rajasthan',
    state: 'Rajasthan',
    region: 'Chittorgarh Hill Fort Plateau',
    categories: ['Architecture', 'Monuments'],
    era: '12th–13th Century CE',
    year: 'c. 12th–13th Century CE',
    builtBy: 'Jijaji Kathod (Jeeja Bhagerwala, Jain Merchant Patron)',
    architecturalStyle: 'Solanki / Maru-Gurjara Jain Architecture',
    materials: 'Carved Local Sandstone',
    silhouetteType: 'tower',
    heroImage: wikiImg('Kirti_Stambh_of_Chittorgarh.jpg', 1400),
    fallbackImage: wikiImg('Kirti_Stambha.jpg', 1200),
    shortDesc:
      'A graceful 22-meter, seven-storeyed sandstone Tower of Fame adorned with intricate Solanki-style balconies and Jain Tirthankara sculptures.',
    historicalBackground:
      'Rising proudly within the historic Chittorgarh Fort in Mewar, the Kirti Stambha ("Tower of Fame") was commissioned during the 12th–13th century CE by the Bagherwal Jain merchant Jijaji Kathod (Jeeja Bhagerwala) and completed by his son Punyasimha. Dedicated to Bhagawan Adinatha (Rishabhanatha), the first Jain Tirthankara, it celebrates spiritual glory and Jain mercantile patronage in Rajasthan.',
    about:
      'Standing approximately 22 meters (72 feet) tall, the tower narrows gracefully from a 9-meter square base to 4.5 meters at its summit. Its seven distinct storeys are linked internally by a narrow winding stone staircase of 54 steps leading up to an open pillared pavilion (chhatri) overlooking the Aravalli plateau.',
    uniqueFeatures: [
      {
        title: 'Seven-Storeyed Tapered Elevation',
        detail:
          'Balanced vertical load distribution achieved through progressive inward stepping of stone courses from base to observation pavilion.'
      },
      {
        title: 'Solanki-Style Latticed Balconies',
        detail:
          'Projecting carved balconies, ornamental toranas, and perforated sandstone jali screens provide daylight and ventilation to the interior stair.'
      },
      {
        title: 'Dedicated Tirthankara Iconography',
        detail:
          'A prominent 5-foot standing figure of Tirthankara Adinatha occupies the lower level, complemented by hundreds of miniature Digambara Jain carvings across upper tiers.'
      },
      {
        title: 'Harmonic Proportion & Seismic Resilience',
        detail:
          'Dry-fitted interlocking sandstone blocks and rhythmic horizontal cornices give the slender vertical tower lasting structural stability.'
      }
    ],
    sculptures:
      'Every facade is richly textured with seated and standing Tirthankaras, yakshas, yakshis, celestial musicians, lotus moldings, and geometric diamond bands typical of western Indian Solanki stone craft.',
    significance:
      'Distinct from the later 15th-century Vijay Stambha nearby, Kirti Stambha is one of Rajasthan’s finest surviving medieval Jain commemorative towers and forms part of the UNESCO World Heritage Hill Forts of Rajasthan.',
    timeline: [
      { year: 'c. 12th–13th C.', event: 'Commissioned by Jain merchant Jijaji Kathod in honor of Tirthankara Adinatha' },
      { year: 'Medieval Mewar', event: 'Stands alongside the adjacent Mahavira Jain temple inside Chittorgarh Fort' },
      { year: '2013', event: 'Chittorgarh Fort inscribed as part of UNESCO World Heritage Hill Forts of Rajasthan' }
    ],
    gallery: [
      {
        url: wikiImg('Kirti_Stambh_of_Chittorgarh.jpg', 1200),
        caption: 'Seven-storeyed sandstone elevation of Kirti Stambha at Chittorgarh Fort'
      },
      {
        url: wikiImg('Kirti_Stambha.jpg', 1200),
        caption: 'Detailed view of Solanki-style carvings and cantilevered stone balconies'
      }
    ],
    mapCoords: { x: 136, y: 238 }
  },
  {
    id: 'bara-imambara-lucknow',
    name: 'Bara Imambara',
    location: 'Lucknow, Uttar Pradesh',
    state: 'Uttar Pradesh',
    region: 'Old Lucknow, Near River Gomti',
    categories: ['Architecture', 'Monuments'],
    era: '18th Century CE',
    year: '1784–1791 CE',
    builtBy: 'Nawab Asaf-ud-Daula (Architect: Kifayatullah)',
    architecturalStyle: 'Awadhi / Late Mughal Vaulted Architecture',
    materials: 'Lakhori Thin Bricks, Slaked Lime Mortar, Surkhi & Organic Binders',
    silhouetteType: 'imambara',
    heroImage: wikiImg('Bara_Imambara_Lucknow.jpg', 1400),
    fallbackImage: wikiImg('Bara_Imambara-Lucknow.jpg', 1200),
    shortDesc:
      'An engineering marvel built in 1784 featuring one of the world’s largest unsupported arched halls and the legendary Bhul Bhulaiya labyrinth.',
    historicalBackground:
      'Commissioned in 1784 CE by Nawab Asaf-ud-Daula of Awadh during a devastating famine, the Bara Imambara (Asafi Imambara) was conceived as a compassionate public-works relief project employing over 20,000 citizens. Designed by Delhi architect Kifayatullah, folklore recalls that commoners built during the day while impoverished nobles dismantled and rebuilt sections at night to earn wages with dignity.',
    about:
      'Devoid of European iron girders or wooden trusses, the complex encompasses grand ceremonial gateways, the Asafi Mosque, a multi-storeyed stepwell (Shahi Baoli), and the monumental main congregation hall. Its structural daring lies in how it vaults a massive open span entirely through interlocking brick geometry and counterweighted hollow passages.',
    uniqueFeatures: [
      {
        title: 'Massive Pillarless Central Hall',
        detail:
          'Measuring roughly 50 meters long, 16 meters wide, and 15 meters high, the central vaulted hall stands completely unsupported by internal pillars, wooden beams, or iron.'
      },
      {
        title: 'The Bhul Bhulaiya (Engineering Labyrinth)',
        detail:
          'Above the central vault lies an intricate maze of 489 identical doorways and over 1,000 interconnected passages designed structurally to lighten dead load above the hollow roof.'
      },
      {
        title: 'Whispering Acoustics & Natural Cooling',
        detail:
          'Thick lime-plastered masonry walls and interconnected hollow galleries create remarkable acoustic transmission—even the scratch of a matchstick carries across corridors—while keeping interiors cool.'
      },
      {
        title: 'Lakhori Brick & Lime-Surkhi Mortar',
        detail:
          'Constructed with thin kiln-fired lakhori bricks bound in traditional lime-surkhi mortar fortified with organic binders for tensile flexibility and durability.'
      }
    ],
    sculptures:
      'Celebrated for delicate Awadhi stucco artistry, cusped foliated arches, rhythmic rooftop chhatri balustrades, ornate merlons, and the iconic twin-fish (Mahi-Maratib) insignia of Awadh.',
    significance:
      'Bara Imambara is a celebrated landmark of compassionate civic patronage and indigenous Indian structural vaulting, proving how load-reduction architecture could produce both monumental elegance and enduring structural strength.',
    timeline: [
      { year: '1784 CE', event: 'Foundation laid by Nawab Asaf-ud-Daula as a famine-relief civic project' },
      { year: '1784–1791 CE', event: 'Architect Kifayatullah completes the pillarless vault & Bhul Bhulaiya' },
      { year: '19th–21st C.', event: 'Preserved as Lucknow’s signature monument of Awadhi engineering heritage' }
    ],
    gallery: [
      {
        url: wikiImg('Bara_Imambara_Lucknow.jpg', 1200),
        caption: 'Monumental symmetrical facade and courtyard of Bara Imambara, Lucknow'
      },
      {
        url: wikiImg('Bara_Imambara-Lucknow.jpg', 1200),
        caption: 'Graceful domes, cusped arches, and minarets of the Asafi complex'
      },
      {
        url: wikiImg('Bada_Imambara_lucknow.jpg', 1200),
        caption: 'View of the ceremonial gateway and ornamental Awadhi balustrades'
      }
    ],
    mapCoords: { x: 227, y: 203 }
  },
  {
    id: 'dashavatara-deogarh',
    name: 'Dashavatara Temple',
    location: 'Deogarh, Uttar Pradesh',
    state: 'Uttar Pradesh',
    region: 'Lalitpur District, Betwa River Valley',
    categories: ['Temples', 'Architecture'],
    era: '5th–6th Century CE (Gupta Golden Age)',
    year: 'c. 500 CE',
    builtBy: 'Gupta Dynasty Patronage',
    architecturalStyle: 'Early Nagara / Gupta-Era Panchayatana Architecture',
    materials: 'Finely Dressed Sandstone Blocks (Dry Stone Ashlar Joinery)',
    silhouetteType: 'gupta',
    heroImage: wikiImg('Remains_of_the_Dashavatara_Temple_in_Deogarh.jpg', 1400),
    fallbackImage: wikiImg('Side_of_the_Dashavatara_Temple_in_Deogarh,_Lalitpur.jpg', 1200),
    shortDesc:
      'A foundational c. 500 CE Gupta-era stone temple showcasing one of India’s earliest surviving shikharas and sublime classical Vishnu reliefs.',
    historicalBackground:
      'Erected around 500 CE during the late Gupta period on a scenic bluff overlooking the Betwa River in Deogarh (Lalitpur district), the Dashavatara Temple stands at a pivotal turning point in Indian architectural history. It captures the exact transition from flat-roofed early Gupta shrines to the soaring North Indian Nagara temple tradition.',
    about:
      'Designed in the classical Panchayatana (five-shrine) layout, the central square sanctum rises from a broad terraced stone plinth (jagati) originally flanked by four smaller corner shrines. Rather than crowding surfaces with excessive ornament, Gupta masters balanced unadorned sandstone planes against three deeply framed monumental sculptural niches (rathikas) on the north, east, and south walls.',
    uniqueFeatures: [
      {
        title: 'Earliest Surviving Stone Shikhara Prototype',
        detail:
          'Features a stepped, curvilinear terraced tower rising above the square garbhagriha—an architectural milestone foreshadowing centuries of Nagara temple spires.'
      },
      {
        title: 'Panchayatana Five-Shrine Plan',
        detail:
          'An elevated square stone terrace accessed by four axial staircases, unifying a central sanctuary with four subsidiary corner shrines.'
      },
      {
        title: 'Ornate Multi-Band Doorway (Dvara-Shakha)',
        detail:
          'The western entrance portal showcases Ganga and Yamuna river goddesses atop makara and tortoise mounts, flanked by mithuna reliefs and a central Vishnu-on-Garuda lintel.'
      },
      {
        title: 'Classical Gupta Sculptural Serenity',
        detail:
          'Three monumental recessed wall panels illustrate Vaishnava cosmology with harmonious proportions, flowing drapery, and serene meditative poise.'
      }
    ],
    sculptures:
      'Celebrated worldwide for three masterwork sandstone panels: Sheshashayi Vishnu (Vishnu reclining on the cosmic serpent Ananta Shesha), Gajendra Moksha (Vishnu rescuing the elephant king), and Nara-Narayana (sages in serene Himalayan penance).',
    significance:
      'Widely regarded by art historians as a textbook milestone of India’s Classical Golden Age, Dashavatara Temple established canonical principles of Nagara temple geometry and narrative temple sculpture.',
    timeline: [
      { year: 'c. 500 CE', event: 'Built during the late Gupta period along the Betwa River valley' },
      { year: '1875', event: 'Surveyed and documented by Alexander Cunningham (Founder of ASI)' },
      { year: 'Present Day', event: 'Protected Monument of National Importance under the ASI' }
    ],
    gallery: [
      {
        url: wikiImg('Remains_of_the_Dashavatara_Temple_in_Deogarh.jpg', 1200),
        caption: 'Sanctum and early terraced Nagara shikhara of the 5th-century Dashavatara Temple'
      },
      {
        url: wikiImg('Sheshshya.jpg', 1200),
        caption: 'Iconic Gupta panel of Sheshashayi Vishnu reclining on cosmic serpent Ananta'
      },
      {
        url: wikiImg('Gajendra_Moksha.jpg', 1000),
        caption: 'Gajendra Moksha sculptural relief depicting divine liberation'
      }
    ],
    mapCoords: { x: 188, y: 244 }
  }
];

/* ============================================================================
   DATA: 6 ARCHITECTURAL TRADITIONS
   ============================================================================ */
const ARCHITECTURAL_TRADITIONS = [
  {
    id: 'hoysala',
    name: 'Hoysala Architecture',
    period: '11th – 14th Century CE',
    region: 'Southern Karnataka (Malnad & Kaveri Basin)',
    image: wikiImg('Chennakeshava_Temple,_Somnath_Pura.jpg', 1200),
    summary:
      'Renowned for stellate (star-shaped) ground plans, soft chloritic schist (soapstone) filigree, and mirror-polished lathe-turned pillars.',
    engineering:
      'Hoysala architects derived intricate multi-pointed star sanctums by rotating squares around a central axis. Quarrying soft soapstone enabled jewel-like undercutting that later hardened naturally, while elevated jagati platforms unified structural stability with ritual circumambulation.',
    hallmarks: [
      'Stellate (16-pointed star) sanctum geometry',
      'Raised circumambulatory Jagati platform',
      'Lathe-turned, mirror-polished stone columns',
      'Horizontal narrative friezes & Madanika brackets'
    ],
    monumentIds: ['keshava-somnathapura', 'chennakeshava-belur']
  },
  {
    id: 'dravidian',
    name: 'Dravidian Architecture',
    period: '6th – 18th Century CE',
    region: 'Tamil Nadu & Southern Deccan',
    image: wikiImg('One_of_the_four_entrance_gopurams_of_Kamakshi_Amman_Temple,_Kanchipuram.jpg', 1200),
    summary:
      'Defined by monumental pyramidal entrance towers (gopurams), tiered vimanas, walled concentric enclosures (prakarams), and hypostyle granite halls.',
    engineering:
      'Engineered under Agama and Shilpa Shastra proportional ratios, Dravidian stone temples masterfully manage massive vertical granite compression loads without mortar, integrating axial sightlines, acoustic mandapas, and sacred temple water tanks (pushkarinis).',
    hallmarks: [
      'Soaring multi-tiered entrance Gopurams',
      'Concentric Prakaram courtyard walls',
      'Pyramidal stepped Vimana over garbhagriha',
      'Monolithic granite pillared Mandapas'
    ],
    monumentIds: ['sundara-kamakshi-tamilnadu', 'virupaksha-hampi']
  },
  {
    id: 'vijayanagara',
    name: 'Vijayanagara Architecture',
    period: '14th – 16th Century CE',
    region: 'Hampi & Deccan Plateau',
    image: wikiImg('Stone_Chariot_Vittala_Temple.jpg', 1200),
    summary:
      'A grand imperial synthesis fusing Chalukya, Chola, Pandya, and Hoysala elements in rugged local granite, celebrated for monumental halls and acoustic pillars.',
    engineering:
      'Vijayanagara master builders overcame the extreme hardness of Hampi granite to carve composite monolithic columns with slender acoustic colonnettes, wide flat-roofed Kalyana Mandapas, and interlocked stone shrines like the iconic Stone Chariot.',
    hallmarks: [
      'Composite granite piers with rearing yalis',
      'Acoustically tuned Musical Pillars',
      'Ceremonial colonnaded Bazaar streets',
      'Monumental Raya Gopurams & Stone Chariots'
    ],
    monumentIds: ['vijaya-vittala-hampi', 'virupaksha-hampi']
  },
  {
    id: 'rockcut',
    name: 'Rock-Cut Architecture',
    period: '3rd Century BCE – 10th Century CE',
    region: 'Western Ghats & Deccan Basalt Escarpments',
    image: wikiImg('Kailasa_Temple_at_Ellora_Caves.jpg', 1200),
    summary:
      'Subtractive architectural sculpture carved directly into living volcanic cliff faces—reaching its global summit in the monolithic Kailasa Temple.',
    engineering:
      'Unlike additive masonry, top-down rock-cut construction required complete 3D architectural visualization before the first chisel stroke. Engineers cut deep vertical isolation trenches in basalt and sculpted roof, pillars, courtyards, and sanctuaries downwards with zero room for corrective rebuilding.',
    hallmarks: [
      'Subtractive top-down monolithic excavation',
      'Natural structural permanence in solid bedrock',
      'Integrated multi-storeyed cliffside galleries',
      'Colossal free-standing rock-cut pillars & bridges'
    ],
    monumentIds: ['kailasa-ellora']
  },
  {
    id: 'gupta',
    name: 'Gupta-Era Temple Architecture',
    period: '4th – 6th Century CE',
    region: 'Gangetic Plains & Central India',
    image: wikiImg('Remains_of_the_Dashavatara_Temple_in_Deogarh.jpg', 1200),
    summary:
      'The formative Golden Age of freestanding stone Hindu temples, introducing the terraced shikhara, Panchayatana layout, and serene classical relief sculpture.',
    engineering:
      'Transitioning from brick and timber shrines to dressed sandstone ashlar masonry, Gupta builders established the square garbhagriha elevated on a stone plinth and balanced structural geometry with recessed iconographic niches.',
    hallmarks: [
      'Emergence of the curvilinear Nagara Shikhara',
      'Panchayatana (five-shrine) platform layout',
      'Ornate Ganga–Yamuna temple doorways',
      'Restrained, balanced classical stonework'
    ],
    monumentIds: ['dashavatara-deogarh']
  },
  {
    id: 'astronomical',
    name: 'Traditional Indian Astronomical Architecture',
    period: '18th Century CE (Rooted in Ancient Siddhantas)',
    region: 'Jaipur, Delhi, Ujjain, Varanasi & Mathura',
    image: wikiImg('Jaipur-Jantar_Mantar-Brihat_Samrat_Yantra-20131016.jpg', 1200),
    summary:
      'Architectural structures functioning directly as scientific instruments—scaling spherical geometry into stable stone and marble observatories.',
    engineering:
      'By aligning monumental masonry gnomons strictly to local latitude and cardinal meridians, Maharaja Sawai Jai Singh II eliminated mechanical pivot wear and parallax errors, achieving remarkable 2-second solar time resolution and precise celestial coordinate tracking.',
    hallmarks: [
      'Latitude-calibrated stone gnomons (Samrat Yantra)',
      'Hemispherical sky-projection marble bowls',
      'Cylindrical altitude–azimuth observatories',
      'Engraved Makrana marble graduation scales'
    ],
    monumentIds: ['jantar-mantar-jaipur']
  }
];

/* ============================================================================
   DATA: 10 SCULPTURE GALLERY HIGHLIGHTS ("Stories Carved in Stone")
   ============================================================================ */
const SCULPTURES = [
  {
    id: 'garuda',
    title: 'Garuda — The Divine Vehicle',
    monument: 'Chennakeshava Temple, Belur',
    monumentId: 'chennakeshava-belur',
    era: 'Hoysala–Vijayanagara Heritage',
    aspect: 'tall',
    image: wikiImg('Belur_Garuda.jpg', 1000),
    description:
      'Sculpted in reverent kneeling posture with folded palms (anjali mudra) and outspread feathered wings, Garuda stands facing Lord Vishnu as the eternal symbol of devotion, vigilance, and swift celestial strength.',
    significance:
      'Illustrates the synthesis of human anatomical poise with avian symbolism in classical Vaishnava iconography, serving as the axial guardian of temple courtyards.'
  },
  {
    id: 'ravana',
    title: 'Ravana — The Mighty Devotee',
    monument: 'Kailasa Temple, Ellora',
    monumentId: 'kailasa-ellora',
    era: '8th Century CE (Rashtrakuta)',
    aspect: 'wide',
    image: wikiImg('Ravana_liftng_mount_Kailasa,_Ellora.jpg', 1000),
    description:
      'Carved deep into the volcanic basalt cliff, this dramatic Ravananugraha panel depicts the ten-headed king Ravana exerting titanic strength beneath Mount Kailasha while Shiva effortlessly restores cosmic balance with the gentle press of his toe.',
    significance:
      'Celebrated worldwide for its bold three-dimensional recess carving, dynamic contrast between turbulent underworld energy and tranquil divine stillness.'
  },
  {
    id: 'celestial-maiden',
    title: 'Celestial Maiden with Musical Instrument',
    monument: 'Chennakeshava Temple, Belur',
    monumentId: 'chennakeshava-belur',
    era: '12th Century CE (Hoysala)',
    aspect: 'tall',
    image: wikiImg('20_Madanika_at_Chennakeshava_Temple.jpg', 1000),
    description:
      'One of Belur’s legendary 42 Madanika (Shilabalika) bracket sculptures, capturing a graceful celestial musician playing percussion/cymbals amidst filigree floral canopy arches.',
    significance:
      'Demonstrates the unmatched precision of Hoysala soapstone sculpting—preserving authentic 12th-century classical Indian dance mudras, hairstyles, ornaments, and musical instruments.'
  },
  {
    id: 'divine-mother',
    title: 'Divine Mother Figure',
    monument: 'Classical Shakti & Gupta Iconography',
    monumentId: 'sundara-kamakshi-tamilnadu',
    era: 'Classical Indian Heritage',
    aspect: 'tall',
    image: wikiImg('Deogarh_1999_Durga.jpg', 1000),
    description:
      'An evocative stone relief portraying Shakti—the serene yet sovereign Divine Mother—radiating protective grace, symmetry, and spiritual compassion.',
    significance:
      'Reflects the deep reverence for the sacred feminine (Devi) across both North and South Indian temple traditions, uniting royal dignity with maternal benevolence.'
  },
  {
    id: 'stone-emblems',
    title: 'Carved Stone Emblems',
    monument: 'Chennakeshava Temple, Belur',
    monumentId: 'chennakeshava-belur',
    era: '12th Century CE (Hoysala)',
    aspect: 'wide',
    image: wikiImg('Hoysala_emblem_at_Belur.JPG', 1000),
    description:
      'The iconic Hoysala royal insignia carved in high relief depicting the legendary founder Sala courageously subduing a fierce lion/tiger at the call "Poy, Sala!" ("Strike, Sala!").',
    significance:
      'A quintessential blend of dynastic heraldry and kinetic stone carving, crowning temple entrance parapets across Belur, Halebidu, and Somnathapura.'
  },
  {
    id: 'pillared-shrines',
    title: 'Ornate Pillared Shrines',
    monument: 'Keshava & Vijayanagara Mandapas',
    monumentId: 'keshava-somnathapura',
    era: '13th–16th Century CE',
    aspect: 'wide',
    image: wikiImg('View_of_the_Chennakeshava_temple_at_Somanathapura.jpg', 1000),
    description:
      'Rhythmic colonnades and peripheral pillared pavilions demonstrating harmonious structural rhythm, light-and-shadow choreography, and stone corbel engineering.',
    significance:
      'Showcases how Indian temples integrated open-air shaded gathering spaces for music, philosophy, and community learning around the inner sanctuary.'
  },
  {
    id: 'musical-pillars',
    title: 'Musical Pillars (Saptaswara Columns)',
    monument: 'Vijaya Vittala Temple, Hampi',
    monumentId: 'vijaya-vittala-hampi',
    era: '16th Century CE (Vijayanagara)',
    aspect: 'wide',
    image: wikiImg('Musical_Pillars_Hampi.jpg', 1000),
    description:
      'Monolithic clusters of slender granite colonnettes surrounding thick structural shafts in the Ranga Mandapa, each finely proportioned to resonate with distinct classical swaras when gently tapped.',
    significance:
      'A breathtaking convergence of metallurgy-free stone carving, granite acoustic material science, and Indian classical musicology.'
  },
  {
    id: 'stone-chariot',
    title: 'Stone Chariot (Garuda Ratha)',
    monument: 'Vijaya Vittala Temple, Hampi',
    monumentId: 'vijaya-vittala-hampi',
    era: '16th Century CE (Vijayanagara)',
    aspect: 'wide',
    image: wikiImg('Stone_Chariot_at_Vittala_temple,_Hampi.jpg', 1000),
    description:
      'An architectural jewel sculpted in the likeness of a ceremonial wooden temple chariot, complete with floral-spoke stone wheels, delicately carved friezes, and twin sentinel elephants.',
    significance:
      'Celebrated across India (and featured on the Indian ₹50 banknote) as an enduring emblem of Hampi’s stone joinery and artistic splendor.'
  },
  {
    id: 'temple-carvings',
    title: 'Detailed Temple Carvings & Madanika Filigree',
    monument: 'Chennakeshava Temple, Belur',
    monumentId: 'chennakeshava-belur',
    era: '12th Century CE (Hoysala)',
    aspect: 'tall',
    image: wikiImg('Chennakeshava_Temple_Belur_Madanika_Bracket_Figure.jpg', 1000),
    description:
      'Micro-scale stone detailing featuring perforated stone bracelets, beaded garlands, leafy scroll canopies, and expressive facial contours rendered in chloritic schist.',
    significance:
      'Highlights the guild discipline and refined chisel tools that allowed stone to behave visually like chased goldsmithing.'
  },
  {
    id: 'dashavatara-panels',
    title: 'Dashavatara Sculptural Panels',
    monument: 'Dashavatara Temple, Deogarh',
    monumentId: 'dashavatara-deogarh',
    era: 'c. 500 CE (Gupta Golden Age)',
    aspect: 'wide',
    image: wikiImg('Sheshshya.jpg', 1000),
    description:
      'The famed Sheshashayi Vishnu sandstone relief showing Vishnu resting serenely upon the multi-hooded cosmic serpent Shesha while Lakshmi gently attends him and Brahma emerges above on a lotus.',
    significance:
      'A foundational masterpiece of classical Gupta art that defined iconographic standards for Vaishnava narrative panels for over a millennium.'
  }
];

/* ============================================================================
   DATA: PROJECT TEAM & ACADEMIC REFERENCES
   ============================================================================ */
const TEAM_MEMBERS = [
  {
    name: 'Prem Vinayak Surange',
    rollNo: '265109015',
    initials: 'PS',
    role: 'Research, Heritage Curation & Experience Design'
  },
  {
    name: 'Aditya Keshaorao Jadhao',
    rollNo: '265109004',
    initials: 'AJ',
    role: 'Architectural Analysis & Historical Documentation'
  },
  {
    name: 'Manthan Ashok Jumrani',
    rollNo: '265109017',
    initials: 'MJ',
    role: 'Scientific & Astronomical Studies Lead'
  },
  {
    name: 'Nitin Jagan Bhoyar',
    rollNo: '265109005',
    initials: 'NB',
    role: 'Sculptural Iconography & Archival Synthesis'
  }
];

const REFERENCES = [
  {
    title: 'Indian Marvels — IKS Project Dossier (Primary Source)',
    institution: 'Department of Indian Knowledge System, Walchand College of Engineering, Sangli (Academic Year 2026–27)',
    note: 'Core monument selection, sculptural themes, and scientific highlights compiled by the student project team under Prof. Surendra Rathod.'
  },
  {
    title: 'Archaeological Survey of India (ASI) — Monument Records & Epigraphy',
    institution: 'Ministry of Culture, Government of India',
    note: 'Verified dates, architectural classifications, inscriptions, and conservation notes for Hampi, Belur, Somnathapura, Ellora, Deogarh, Chittorgarh, and Lucknow.'
  },
  {
    title: 'UNESCO World Heritage Centre — Official Inscription Dossiers',
    institution: 'Group of Monuments at Hampi (1986), Ellora Caves (1983), Jantar Mantar Jaipur (2010), Hill Forts of Rajasthan (2013), Sacred Ensembles of the Hoysalas (2023)',
    note: 'Verified outstanding universal value, engineering methodologies, and architectural taxonomy.'
  },
  {
    title: 'Indira Gandhi National Centre for the Arts (IGNCA) — Kalakosa & Temple Archives',
    institution: 'National Archival Repository for Indian Art, Sculpture & Agama Traditions',
    note: 'Reference taxonomy for Dravidian, Hoysala, Gupta Nagara, and classical iconographic motifs.'
  }
];

/* ============================================================================
   ORNAMENTAL SVG COMPONENTS (LOTUS DIVIDER, MANDALA, EMBLEM)
   ============================================================================ */
const TempleEmblem = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <circle cx="32" cy="32" r="29" stroke="#C59B38" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
    <circle cx="32" cy="32" r="24" stroke="#DFBD69" strokeWidth="1" opacity="0.5" />
    {/* Kalasha & Shikhara Spire */}
    <path d="M32 10L34 15H30L32 10Z" fill="#DFBD69" />
    <path d="M26 22L32 15L38 22H26Z" stroke="#DFBD69" strokeWidth="1.6" fill="#C59B38" fillOpacity="0.2" />
    <path d="M21 31L26 22H38L43 31H21Z" stroke="#DFBD69" strokeWidth="1.6" fill="#C59B38" fillOpacity="0.15" />
    <path d="M17 44V31H47V44" stroke="#DFBD69" strokeWidth="1.6" />
    {/* Sanctum Arch */}
    <path d="M27 44V37C27 34.2 29.2 32 32 32C34.8 32 37 34.2 37 37V44" stroke="#DFBD69" strokeWidth="1.6" />
    {/* Stepped Plinth */}
    <path d="M14 44H50M12 48H52" stroke="#C59B38" strokeWidth="2" strokeLinecap="round" />
    {/* Lotus Petals Base */}
    <path d="M24 52C27 50 37 50 40 52" stroke="#DFBD69" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const LotusDivider = ({ light = false, className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`} aria-hidden="true">
    <div className={`h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent ${light ? 'to-[#DFBD69]/70' : 'to-[#C59B38]/80'}`} />
    <svg viewBox="0 0 40 20" className="w-10 h-5 flex-shrink-0" fill="none">
      <path
        d="M20 2C22 6 24 10 20 18C16 10 18 6 20 2Z"
        fill={light ? '#DFBD69' : '#C59B38'}
      />
      <path
        d="M20 18C15 15 10 12 6 14C10 10 14 10 20 18Z"
        fill={light ? '#DFBD69' : '#C59B38'}
        opacity="0.7"
      />
      <path
        d="M20 18C25 15 30 12 34 14C30 10 26 10 20 18Z"
        fill={light ? '#DFBD69' : '#C59B38'}
        opacity="0.7"
      />
      <circle cx="20" cy="10" r="1.5" fill={light ? '#2B0B10' : '#FAF6EE'} />
    </svg>
    <div className={`h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent ${light ? 'to-[#DFBD69]/70' : 'to-[#C59B38]/80'}`} />
  </div>
);

const MandalaWatermark = ({ className = '', color = '#8C6239', opacity = 0.06 }) => (
  <svg
    viewBox="0 0 400 400"
    fill="none"
    className={`pointer-events-none select-none ${className}`}
    style={{ opacity }}
    aria-hidden="true"
  >
    <circle cx="200" cy="200" r="190" stroke={color} strokeWidth="1" strokeDasharray="4 4" />
    <circle cx="200" cy="200" r="165" stroke={color} strokeWidth="1.2" />
    <circle cx="200" cy="200" r="120" stroke={color} strokeWidth="1" />
    <circle cx="200" cy="200" r="72" stroke={color} strokeWidth="1.2" />
    <circle cx="200" cy="200" r="30" stroke={color} strokeWidth="1" />
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * 360) / 16;
      return (
        <g key={i} transform={`rotate(${angle} 200 200)`}>
          <path d="M200 35 C214 75 214 115 200 155 C186 115 186 75 200 35Z" stroke={color} strokeWidth="1" />
          <path d="M200 120 C208 145 208 170 200 190 C192 170 192 145 200 120Z" stroke={color} strokeWidth="0.9" />
          <circle cx="200" cy="22" r="3.5" fill={color} />
        </g>
      );
    })}
  </svg>
);

/* ============================================================================
   REUSABLE <HeritageImage /> WITH SHIMMER + FALLBACK URL + CUSTOM SVG ARTWORK
   ============================================================================ */
const HeritageImage = ({
  src,
  fallbackSrc,
  alt,
  title = '',
  subtitle = '',
  silhouetteType = 'dravidian',
  className = 'w-full h-full object-cover',
  containerClassName = 'w-full h-full',
  loading = 'lazy'
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setTriedFallback(false);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!triedFallback && fallbackSrc && fallbackSrc !== currentSrc) {
      setTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#3E0D16] via-[#2B0B10] to-[#1D070B] text-[#FAF6EE] p-6 text-center ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        <MandalaWatermark className="absolute w-72 h-72 -top-12 -right-12" color="#DFBD69" opacity={0.09} />
        <div className="relative z-10 flex flex-col items-center max-w-xs">
          <svg viewBox="0 0 180 110" className="w-40 h-24 mb-3 opacity-90" fill="none">
            {silhouetteType === 'jantar' ? (
              <>
                <path d="M25 95 L130 22 L130 95 Z" stroke="#DFBD69" strokeWidth="2" fill="#C59B38" fillOpacity="0.18" />
                <path d="M90 95 A45 45 0 0 1 160 65" stroke="#DFBD69" strokeWidth="2" />
                <circle cx="48" cy="34" r="10" stroke="#DFBD69" strokeWidth="1.5" />
                <line x1="15" y1="95" x2="165" y2="95" stroke="#C59B38" strokeWidth="2" />
              </>
            ) : silhouetteType === 'imambara' ? (
              <>
                <path d="M25 95 V55 H155 V95" stroke="#DFBD69" strokeWidth="1.8" fill="#C59B38" fillOpacity="0.12" />
                <path d="M62 55 C62 32 118 32 118 55" stroke="#DFBD69" strokeWidth="2" fill="#C59B38" fillOpacity="0.2" />
                <path d="M40 95 V74 C40 65 56 65 56 74 V95 M78 95 V70 C78 58 102 58 102 70 V95 M124 95 V74 C124 65 140 65 140 74 V95" stroke="#DFBD69" strokeWidth="1.5" />
                <line x1="15" y1="95" x2="165" y2="95" stroke="#C59B38" strokeWidth="2" />
              </>
            ) : silhouetteType === 'tower' ? (
              <>
                <path d="M72 95 L78 24 H102 L108 95 Z" stroke="#DFBD69" strokeWidth="2" fill="#C59B38" fillOpacity="0.16" />
                <path d="M74 36 H106 M73 50 H107 M72 64 H108 M71 78 H109" stroke="#DFBD69" strokeWidth="1.3" />
                <path d="M84 24 L90 13 L96 24" stroke="#DFBD69" strokeWidth="1.8" />
                <line x1="25" y1="95" x2="155" y2="95" stroke="#C59B38" strokeWidth="2" />
              </>
            ) : (
              <>
                <path d="M90 12 L94 20 H86 Z" fill="#DFBD69" />
                <path d="M74 34 L90 20 L106 34 H74 Z" stroke="#DFBD69" strokeWidth="1.8" fill="#C59B38" fillOpacity="0.22" />
                <path d="M60 52 L74 34 H106 L120 52 H60 Z" stroke="#DFBD69" strokeWidth="1.8" fill="#C59B38" fillOpacity="0.16" />
                <path d="M44 95 V52 H136 V95" stroke="#DFBD69" strokeWidth="1.8" fill="#C59B38" fillOpacity="0.1" />
                <path d="M78 95 V73 C78 65 102 65 102 73 V95" stroke="#DFBD69" strokeWidth="1.8" />
                <line x1="20" y1="95" x2="160" y2="95" stroke="#C59B38" strokeWidth="2" />
              </>
            )}
          </svg>
          <span className="font-cinzel text-sm tracking-widest uppercase text-[#DFBD69]">
            {title || alt}
          </span>
          {subtitle && (
            <span className="text-xs text-[#FAF6EE]/70 mt-1 font-sans">{subtitle}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#EAE0CC] ${containerClassName}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#EAE0CC] via-[#F5EFE2] to-[#EAE0CC] animate-pulse" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`${className} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

/* ============================================================================
   INTERACTIVE STEM LAB 1: SAMRAT YANTRA SOLAR TIMEKEEPING
   ============================================================================ */
const SamratYantraLab = () => {
  // Hours from 6.0 (6:00 AM) to 18.0 (6:00 PM), default 10.5 (10:30 AM)
  const [solarHour, setSolarHour] = useState(10.25);

  // Format solar time down to seconds for authentic demonstration
  const formatTime = (h) => {
    const totalSec = Math.round(h * 3600);
    const hrs24 = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    const period = hrs24 >= 12 ? 'PM' : 'AM';
    const hrs12 = hrs24 % 12 === 0 ? 12 : hrs24 % 12;
    return `${String(hrs12).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} ${period}`;
  };

  // Hour angle: -90 deg at 6 AM, 0 deg at 12 PM, +90 deg at 6 PM
  const hourAngleDeg = (solarHour - 12) * 15;
  const sunRad = ((solarHour - 6) / 12) * Math.PI; // 0 to PI
  const sunX = 240 - Math.cos(sunRad) * 175;
  const sunY = 195 - Math.sin(sunRad) * 148;
  const altitudeDeg = Math.max(0, Math.round(Math.sin(sunRad) * 63 * 10) / 10); // Jaipur equinox peak ~63°

  // Shadow falls on West quadrant in the morning (h < 12), East quadrant in afternoon (h > 12)
  const isMorning = solarHour < 12;
  const isNoon = Math.abs(solarHour - 12) < 0.08;
  const quadProgress = Math.min(1, Math.abs(solarHour - 12) / 6);

  // Compute shadow point along left (West) or right (East) marble quadrant arc
  // Left quadrant arc: center (240, 175), radius 110, angle from 180 deg (horizon) to 90 deg (bottom)
  const shadowAngle = isMorning
    ? Math.PI * (0.5 + 0.48 * quadProgress)
    : Math.PI * (0.5 - 0.48 * quadProgress);
  const shadowX = 240 + Math.cos(shadowAngle) * 120;
  const shadowY = 148 + Math.sin(shadowAngle) * 105;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Interactive SVG Sundial */}
      <div className="lg:col-span-7 bg-[#1F070B]/80 border border-[#C59B38]/35 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#DFBD69]/80 mb-3">
          <span>Vrihat Samrat Yantra • 27° N Latitude Calibration</span>
          <span className="px-2.5 py-0.5 rounded bg-[#C59B38]/20 text-[#DFBD69] font-semibold">
            {isNoon ? 'Solar Meridian (Noon)' : isMorning ? 'West Marble Quadrant' : 'East Marble Quadrant'}
          </span>
        </div>

        <svg viewBox="0 0 480 285" className="w-full h-auto" role="img" aria-label="Samrat Yantra Interactive Sundial Simulation">
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE89E" stopOpacity="1" />
              <stop offset="60%" stopColor="#DFBD69" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#DFBD69" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sky Arc Track */}
          <path d="M65 195 A175 148 0 0 1 415 195" stroke="#DFBD69" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" fill="none" />
          <text x="48" y="210" fill="#DFBD69" fontSize="10" opacity="0.7">EAST (6 AM)</text>
          <text x="382" y="210" fill="#DFBD69" fontSize="10" opacity="0.7">WEST (6 PM)</text>

          {/* Sun Ray to Gnomon Apex */}
          <line x1={sunX} y1={sunY} x2="240" y2="148" stroke="#FFE89E" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.55" />

          {/* Animated Sun */}
          <circle cx={sunX} cy={sunY} r="22" fill="url(#sunGlow)" />
          <circle cx={sunX} cy={sunY} r="9" fill="#FFF3C4" stroke="#DFBD69" strokeWidth="1.5" />

          {/* West & East Curved Marble Quadrants */}
          <path
            d="M120 155 A120 105 0 0 0 240 253"
            stroke="#FAF6EE"
            strokeWidth="12"
            fill="none"
            opacity="0.22"
          />
          <path
            d="M120 155 A120 105 0 0 0 240 253"
            stroke="#DFBD69"
            strokeWidth="1.8"
            fill="none"
          />
          <path
            d="M360 155 A120 105 0 0 1 240 253"
            stroke="#FAF6EE"
            strokeWidth="12"
            fill="none"
            opacity="0.22"
          />
          <path
            d="M360 155 A120 105 0 0 1 240 253"
            stroke="#DFBD69"
            strokeWidth="1.8"
            fill="none"
          />

          {/* Graduation Tick Marks on Quadrants */}
          {Array.from({ length: 13 }).map((_, idx) => {
            const ang = Math.PI * (0.04 + (idx / 12) * 0.92);
            const x1 = 240 + Math.cos(ang) * 114;
            const y1 = 148 + Math.sin(ang) * 99;
            const x2 = 240 + Math.cos(ang) * 126;
            const y2 = 148 + Math.sin(ang) * 111;
            return <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FAF6EE" strokeWidth="1.2" opacity="0.7" />;
          })}

          {/* Cast Shadow Band on Active Quadrant */}
          {!isNoon && (
            <>
              <line x1="240" y1="148" x2={shadowX} y2={shadowY} stroke="#140407" strokeWidth="5" opacity="0.85" />
              <line x1="240" y1="148" x2={shadowX} y2={shadowY} stroke="#DFBD69" strokeWidth="1.4" />
              <circle cx={shadowX} cy={shadowY} r="6.5" fill="#DFBD69" stroke="#2B0B10" strokeWidth="2" />
            </>
          )}

          {/* Central 27° Inclined Gnomon Wall */}
          <polygon
            points="224,255 240,86 256,255"
            fill="#5C1420"
            stroke="#DFBD69"
            strokeWidth="2"
          />
          <line x1="240" y1="86" x2="240" y2="255" stroke="#DFBD69" strokeWidth="1" opacity="0.6" />
          <text x="240" y="75" textAnchor="middle" fill="#DFBD69" fontSize="10" fontWeight="600">
            27m GNOMON (27° INCLINATION)
          </text>

          {/* Ground Baseline */}
          <line x1="35" y1="258" x2="445" y2="258" stroke="#C59B38" strokeWidth="1.5" opacity="0.6" />
        </svg>

        {/* Interactive Slider Controls */}
        <div className="mt-4 pt-4 border-t border-[#C59B38]/25">
          <div className="flex items-center justify-between text-sm mb-2">
            <label htmlFor="solar-slider" className="text-[#FAF6EE]/90 font-medium flex items-center gap-2">
              <Sun className="w-4 h-4 text-[#DFBD69]" />
              Adjust Solar Time of Day
            </label>
            <span className="font-mono text-[#DFBD69] font-semibold">{formatTime(solarHour)}</span>
          </div>
          <input
            id="solar-slider"
            type="range"
            min="6.05"
            max="17.95"
            step="0.05"
            value={solarHour}
            onChange={(e) => setSolarHour(parseFloat(e.target.value))}
            className="w-full accent-[#DFBD69] cursor-pointer h-2 bg-[#3E0D16] rounded-lg"
          />
          <div className="flex justify-between text-[11px] text-[#FAF6EE]/60 mt-1">
            <span>06:00 AM</span>
            <span>09:00 AM</span>
            <span>12:00 PM (Noon)</span>
            <span>03:00 PM</span>
            <span>06:00 PM</span>
          </div>
        </div>
      </div>

      {/* Scientific Readout & Explanation */}
      <div className="lg:col-span-5 space-y-5">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#DFBD69]">Equinoctial Sundial Science</span>
          <h3 className="font-cinzel text-2xl sm:text-3xl text-[#FAF6EE] mt-1">
            Samrat Yantra & 2-Second Precision
          </h3>
        </div>
        <p className="text-[#FAF6EE]/80 leading-relaxed text-sm sm:text-base">
          Built by Maharaja Sawai Jai Singh II in 1734 CE, the Vrihat Samrat Yantra’s hypotenuse is aligned
          precisely at <strong className="text-[#DFBD69]">27° north</strong>—matching Jaipur’s latitude so the gnomon
          runs strictly parallel to Earth’s rotational axis. As the sun moves across the sky, the shadow edge sweeps
          across the curved Makrana marble quadrant at nearly <strong className="text-[#DFBD69]">1 mm per second</strong>.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1F070B]/70 border border-[#C59B38]/30 rounded-lg p-3.5">
            <div className="text-[11px] uppercase tracking-wider text-[#DFBD69]/80">Local Solar Time</div>
            <div className="font-mono text-lg text-[#FAF6EE] font-semibold mt-1">{formatTime(solarHour)}</div>
          </div>
          <div className="bg-[#1F070B]/70 border border-[#C59B38]/30 rounded-lg p-3.5">
            <div className="text-[11px] uppercase tracking-wider text-[#DFBD69]/80">Sun Altitude</div>
            <div className="font-mono text-lg text-[#FAF6EE] font-semibold mt-1">{altitudeDeg}°</div>
          </div>
          <div className="bg-[#1F070B]/70 border border-[#C59B38]/30 rounded-lg p-3.5">
            <div className="text-[11px] uppercase tracking-wider text-[#DFBD69]/80">Hour Angle</div>
            <div className="font-mono text-lg text-[#FAF6EE] font-semibold mt-1">
              {hourAngleDeg > 0 ? `+${hourAngleDeg.toFixed(1)}°` : `${hourAngleDeg.toFixed(1)}°`}
            </div>
          </div>
          <div className="bg-[#1F070B]/70 border border-[#C59B38]/30 rounded-lg p-3.5">
            <div className="text-[11px] uppercase tracking-wider text-[#DFBD69]/80">Scale Resolution</div>
            <div className="font-mono text-lg text-[#DFBD69] font-semibold mt-1">2 Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   INTERACTIVE STEM LAB 2: JAI PRAKASH & RAM YANTRA
   ============================================================================ */
const CelestialYantraLab = () => {
  const [instrument, setInstrument] = useState('jaiprakash');
  const [altitude, setAltitude] = useState(52); // degrees 10 - 85
  const [azimuth, setAzimuth] = useState(135); // degrees 0 - 360

  const rNorm = (90 - altitude) / 90; // 0 at zenith, 1 at horizon
  const azRad = ((azimuth - 90) * Math.PI) / 180;
  // In Jai Prakash inverted hemisphere, shadow falls opposite the sun (+180 deg)
  const jpX = 160 + Math.cos(azRad + Math.PI) * rNorm * 95;
  const jpY = 140 + Math.sin(azRad + Math.PI) * rNorm * 95;

  const zodiacSigns = ['Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya', 'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'];
  const activeZodiac = zodiacSigns[Math.floor((azimuth % 360) / 30)];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-7 bg-[#1F070B]/80 border border-[#C59B38]/35 rounded-xl p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="inline-flex rounded-lg bg-[#2B0B10] p-1 border border-[#C59B38]/30">
            <button
              type="button"
              onClick={() => setInstrument('jaiprakash')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase transition ${
                instrument === 'jaiprakash'
                  ? 'bg-[#C59B38] text-[#231510]'
                  : 'text-[#FAF6EE]/75 hover:text-[#DFBD69]'
              }`}
            >
              Jai Prakash Yantra
            </button>
            <button
              type="button"
              onClick={() => setInstrument('ram')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase transition ${
                instrument === 'ram'
                  ? 'bg-[#C59B38] text-[#231510]'
                  : 'text-[#FAF6EE]/75 hover:text-[#DFBD69]'
              }`}
            >
              Ram Yantra
            </button>
          </div>
          <span className="text-xs text-[#DFBD69] font-mono">
            Alt: {altitude}° | Az: {azimuth}°
          </span>
        </div>

        {instrument === 'jaiprakash' ? (
          <svg viewBox="0 0 320 275" className="w-full max-w-md mx-auto h-auto" role="img" aria-label="Jai Prakash Yantra Hemispherical Bowl">
            {/* Outer Marble Rim */}
            <circle cx="160" cy="140" r="108" fill="#2B0B10" stroke="#DFBD69" strokeWidth="2.5" />
            <circle cx="160" cy="140" r="95" fill="#3E0D16" stroke="#C59B38" strokeWidth="1" opacity="0.8" />
            {/* Altitude Circles */}
            <circle cx="160" cy="140" r="68" fill="none" stroke="#DFBD69" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.45" />
            <circle cx="160" cy="140" r="40" fill="none" stroke="#DFBD69" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.45" />
            {/* Complementary Walkable Marble Sectors */}
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const a1 = (deg * Math.PI) / 180;
              const a2 = ((deg + 30) * Math.PI) / 180;
              const x1 = 160 + Math.cos(a1) * 95;
              const y1 = 140 + Math.sin(a1) * 95;
              const x2 = 160 + Math.cos(a2) * 95;
              const y2 = 140 + Math.sin(a2) * 95;
              return (
                <path
                  key={deg}
                  d={`M160 140 L${x1} ${y1} A95 95 0 0 1 ${x2} ${y2} Z`}
                  fill="#FAF6EE"
                  fillOpacity="0.09"
                  stroke="#DFBD69"
                  strokeWidth="0.7"
                  opacity="0.6"
                />
              );
            })}
            {/* Suspended Cross-Wires */}
            <line x1="52" y1="140" x2="268" y2="140" stroke="#DFBD69" strokeWidth="1" opacity="0.7" />
            <line x1="160" y1="32" x2="160" y2="248" stroke="#DFBD69" strokeWidth="1" opacity="0.7" />
            <circle cx="160" cy="140" r="4.5" fill="none" stroke="#FFE89E" strokeWidth="1.5" />

            {/* Cast Ring Shadow Inside Bowl */}
            <line x1="160" y1="140" x2={jpX} y2={jpY} stroke="#DFBD69" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx={jpX} cy={jpY} r="8" fill="#DFBD69" fillOpacity="0.28" stroke="#FFE89E" strokeWidth="2" />
            <circle cx={jpX} cy={jpY} r="2.5" fill="#FFE89E" />

            <text x="160" y="22" textAnchor="middle" fill="#DFBD69" fontSize="10">NORTH</text>
            <text x="160" y="266" textAnchor="middle" fill="#DFBD69" fontSize="10">SOUTH</text>
            <text x="26" y="143" textAnchor="middle" fill="#DFBD69" fontSize="10">W</text>
            <text x="294" y="143" textAnchor="middle" fill="#DFBD69" fontSize="10">E</text>
          </svg>
        ) : (
          <svg viewBox="0 0 320 275" className="w-full max-w-md mx-auto h-auto" role="img" aria-label="Ram Yantra Cylindrical Observatory">
            {/* Open-Roofed Cylindrical Sectors */}
            <circle cx="160" cy="140" r="105" fill="#2B0B10" stroke="#DFBD69" strokeWidth="2" strokeDasharray="22 10" />
            <circle cx="160" cy="140" r="90" fill="#3E0D16" stroke="#C59B38" strokeWidth="1" />
            {/* 12 Radial Floor Sectors */}
            {Array.from({ length: 12 }).map((_, i) => {
              const a1 = (i * 30 * Math.PI) / 180;
              const a2 = ((i * 30 + 18) * Math.PI) / 180;
              const x1 = 160 + Math.cos(a1) * 90;
              const y1 = 140 + Math.sin(a1) * 90;
              const x2 = 160 + Math.cos(a2) * 90;
              const y2 = 140 + Math.sin(a2) * 90;
              return (
                <path
                  key={i}
                  d={`M160 140 L${x1} ${y1} A90 90 0 0 1 ${x2} ${y2} Z`}
                  fill="#FAF6EE"
                  fillOpacity="0.14"
                  stroke="#DFBD69"
                  strokeWidth="0.9"
                />
              );
            })}
            {/* Central Vertical Gnomon Pillar */}
            <circle cx="160" cy="140" r="9" fill="#C59B38" stroke="#FAF6EE" strokeWidth="1.8" />
            {/* Shadow Projection from Central Pillar */}
            <line x1="160" y1="140" x2={jpX} y2={jpY} stroke="#140407" strokeWidth="6" strokeLinecap="round" />
            <line x1="160" y1="140" x2={jpX} y2={jpY} stroke="#FFE89E" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx={jpX} cy={jpY} r="5.5" fill="#FFE89E" />
            <text x="160" y="22" textAnchor="middle" fill="#DFBD69" fontSize="10">
              {altitude > 45 ? 'SHADOW ON FLOOR SECTORS (ALT > 45°)' : 'SHADOW ON CYLINDER WALLS (ALT ≤ 45°)'}
            </text>
            <text x="160" y="266" textAnchor="middle" fill="#FAF6EE" fontSize="10" opacity="0.75">
              Twin Complementary Cylinders Cover 100% of Azimuths
            </text>
          </svg>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#C59B38]/25">
          <div>
            <div className="flex justify-between text-xs text-[#FAF6EE]/85 mb-1">
              <span>Celestial Altitude</span>
              <span className="font-mono text-[#DFBD69]">{altitude}°</span>
            </div>
            <input
              type="range"
              min="12"
              max="84"
              value={altitude}
              onChange={(e) => setAltitude(Number(e.target.value))}
              className="w-full accent-[#DFBD69] cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs text-[#FAF6EE]/85 mb-1">
              <span>Solar Azimuth</span>
              <span className="font-mono text-[#DFBD69]">{azimuth}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="359"
              value={azimuth}
              onChange={(e) => setAzimuth(Number(e.target.value))}
              className="w-full accent-[#DFBD69] cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <span className="text-xs uppercase tracking-[0.2em] text-[#DFBD69]">
          {instrument === 'jaiprakash' ? 'Hemispherical Sky Projection' : 'Altitude–Azimuth Cylinder'}
        </span>
        <h3 className="font-cinzel text-2xl sm:text-3xl text-[#FAF6EE]">
          {instrument === 'jaiprakash' ? 'Jai Prakash Yantra' : 'Ram Yantra'}
        </h3>
        <p className="text-[#FAF6EE]/80 text-sm sm:text-base leading-relaxed">
          {instrument === 'jaiprakash'
            ? 'Devised directly by Sawai Jai Singh II, the Jai Prakash Yantra consists of two complementary sunken white-marble hemispheres mapping the inverted celestial dome. A tiny brass ring suspended at the center casts a pinpoint shadow inside the bowl, revealing solar altitude, azimuth, local time, and the active zodiacal rashi.'
            : 'Named after Jai Singh’s grandfather Maharaja Ram Singh, the twin open-roofed Ram Yantra cylinders measure horizontal coordinates (altitude & azimuth). Its radius equals the central pillar height—so altitudes above 45° cast shadows onto the radial floor sectors, while lower altitudes climb the graduated circular wall.'}
        </p>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="bg-[#1F070B]/70 border border-[#C59B38]/30 rounded-lg p-3.5">
            <div className="text-[11px] uppercase tracking-wider text-[#DFBD69]/80">Active Rashi Sector</div>
            <div className="font-cinzel text-base text-[#FAF6EE] mt-1">{activeZodiac}</div>
          </div>
          <div className="bg-[#1F070B]/70 border border-[#C59B38]/30 rounded-lg p-3.5">
            <div className="text-[11px] uppercase tracking-wider text-[#DFBD69]/80">Reading Zone</div>
            <div className="font-sans text-sm text-[#DFBD69] font-medium mt-1">
              {instrument === 'jaiprakash'
                ? 'Inverted Marble Bowl'
                : altitude > 45
                ? 'Radial Floor Scale'
                : 'Vertical Wall Scale'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   INTERACTIVE STEM LAB 3: VIRUPAKSHA TEMPLE PINHOLE CAMERA EFFECT
   ============================================================================ */
const PinholeCameraLab = () => {
  const [showRays, setShowRays] = useState(true);
  const [apertureSize, setApertureSize] = useState(2); // 1 = ultra-sharp, 5 = softer/brighter
  const [sunIntensity, setSunIntensity] = useState(85);

  const blurPx = (apertureSize - 1) * 1.1;
  const projectionOpacity = Math.min(1, (sunIntensity / 100) * (0.55 + apertureSize * 0.1));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-7 bg-[#1F070B]/85 border border-[#C59B38]/35 rounded-xl p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs">
          <span className="uppercase tracking-widest text-[#DFBD69]">
            Optical Ray-Tracing Cross-Section (~300 ft Axis)
          </span>
          <button
            type="button"
            onClick={() => setShowRays((v) => !v)}
            className={`px-3 py-1 rounded-full border text-xs font-medium transition flex items-center gap-1.5 ${
              showRays
                ? 'bg-[#C59B38] text-[#231510] border-[#DFBD69]'
                : 'bg-transparent text-[#DFBD69] border-[#C59B38]/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {showRays ? 'Hide Light Rays' : 'Show Light Rays'}
          </button>
        </div>

        <svg viewBox="0 0 540 250" className="w-full h-auto" role="img" aria-label="Virupaksha Temple Pinhole Camera Ray Tracing">
          {/* Dark Interior Chamber Background */}
          <rect x="280" y="34" width="238" height="184" fill="#0F0305" stroke="#C59B38" strokeWidth="1.2" opacity="0.95" />
          <text x="399" y="52" textAnchor="middle" fill="#DFBD69" fontSize="9.5" opacity="0.75">
            DARK INTERIOR HALL (SAALU MANDAPA)
          </text>

          {/* Exterior Courtyard Label */}
          <text x="115" y="30" textAnchor="middle" fill="#DFBD69" fontSize="9.5" opacity="0.8">
            EASTERN RAJA GOPURAM (50m TALL)
          </text>

          {/* Sunlit Upright Raja Gopuram Silhouette on Left */}
          <g fill="#DFBD69" opacity={0.45 + (sunIntensity / 100) * 0.55}>
            <polygon points="88,60 95,46 102,60" />
            <polygon points="78,84 88,60 102,60 112,84" />
            <polygon points="68,112 78,84 112,84 122,112" />
            <polygon points="58,144 68,112 122,112 132,144" />
            <rect x="52" y="144" width="86" height="68" />
            <rect x="84" y="176" width="22" height="36" fill="#2B0B10" />
          </g>

          {/* Stone Wall with Pinhole Slit Aperture */}
          <rect x="274" y="34" width="12" height={88 - apertureSize * 1.4} fill="#7A5236" stroke="#DFBD69" strokeWidth="1" />
          <rect x="274" y={128 + apertureSize * 1.4} width="12" height={90 - apertureSize * 1.4} fill="#7A5236" stroke="#DFBD69" strokeWidth="1" />
          <text x="280" y="236" textAnchor="middle" fill="#DFBD69" fontSize="9.5">
            NARROW STONE SLIT APERTURE
          </text>

          {/* Crossing Optical Light Rays */}
          {showRays && (
            <g>
              {/* Top of Gopuram -> Through Pinhole -> Bottom of Wall */}
              <line x1="95" y1="46" x2="482" y2="195" stroke="#FFE89E" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.85" />
              {/* Bottom of Gopuram -> Through Pinhole -> Top of Wall */}
              <line x1="95" y1="210" x2="482" y2="68" stroke="#C59B38" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.85" />
              {/* Center axis */}
              <line x1="95" y1="126" x2="482" y2="126" stroke="#FAF6EE" strokeWidth="0.7" strokeDasharray="2 4" opacity="0.35" />
              {/* Aperture Focal Glow */}
              <circle cx="280" cy="125" r="4" fill="#FFE89E" />
            </g>
          )}

          {/* Interior Projection Wall */}
          <line x1="490" y1="54" x2="490" y2="210" stroke="#DFBD69" strokeWidth="2.5" />

          {/* INVERTED Projected Shadow Image of Raja Gopuram on Interior Wall */}
          <g
            transform="translate(465, 198) scale(0.75, -0.75)"
            style={{ filter: `blur(${blurPx}px)` }}
            opacity={projectionOpacity}
          >
            <polygon points="0,16 6,2 12,16" fill="#FFE89E" />
            <polygon points="-8,38 0,16 12,16 20,38" fill="#FFE89E" />
            <polygon points="-16,64 -8,38 20,38 28,64" fill="#FFE89E" />
            <polygon points="-24,96 -16,64 28,64 36,96" fill="#FFE89E" />
            <rect x="-28" y="96" width="68" height="58" fill="#FFE89E" />
            <rect x="-4" y="122" width="20" height="32" fill="#0F0305" />
          </g>

          <text x="455" y="236" textAnchor="middle" fill="#FFE89E" fontSize="9.5" fontWeight="600">
            INVERTED PROJECTION
          </text>
          <line x1="30" y1="214" x2="520" y2="214" stroke="#C59B38" strokeWidth="1.2" opacity="0.5" />
        </svg>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#C59B38]/25">
          <div>
            <div className="flex justify-between text-xs text-[#FAF6EE]/85 mb-1">
              <span>Aperture Width (Sharpness vs. Brightness)</span>
              <span className="font-mono text-[#DFBD69]">
                {apertureSize === 1 ? 'Pinpoint Crisp' : apertureSize <= 3 ? 'Balanced' : 'Wide / Soft'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={apertureSize}
              onChange={(e) => setApertureSize(Number(e.target.value))}
              className="w-full accent-[#DFBD69] cursor-pointer"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs text-[#FAF6EE]/85 mb-1">
              <span>Exterior Sunlight Intensity</span>
              <span className="font-mono text-[#DFBD69]">{sunIntensity}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              value={sunIntensity}
              onChange={(e) => setSunIntensity(Number(e.target.value))}
              className="w-full accent-[#DFBD69] cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <span className="text-xs uppercase tracking-[0.2em] text-[#DFBD69]">Ancient Architectural Optics</span>
        <h3 className="font-cinzel text-2xl sm:text-3xl text-[#FAF6EE]">
          Pinhole Camera Effect at Virupaksha Temple
        </h3>
        <p className="text-[#FAF6EE]/80 text-sm sm:text-base leading-relaxed">
          Centuries before modern photography, the darkened rear chamber (Saalu Mandapa) behind Hampi’s Virupaksha
          sanctum exhibited a startling optical phenomenon. A narrow rectangular opening in the stone wall acts as a{' '}
          <strong className="text-[#DFBD69]">camera obscura (pinhole aperture)</strong>: light rays traveling in straight
          lines from the sunlit top and base of the 50-meter eastern Raja Gopuram cross through the slit, projecting a
          crisp, upside-down silhouette onto the dark interior wall roughly 300 feet away.
        </p>
        <div className="bg-[#1F070B]/70 border border-[#C59B38]/30 rounded-lg p-4 text-xs sm:text-sm text-[#FAF6EE]/85 space-y-2">
          <div className="flex items-center gap-2 text-[#DFBD69] font-semibold">
            <Sparkles className="w-4 h-4" /> Optical Physics Principle
          </div>
          <p>
            <strong>Rectilinear Propagation of Light:</strong> Reducing the aperture narrows the cone of rays from each
            point on the tower, producing a sharper inverted image—try adjusting the Aperture slider to witness the
            real optical trade-off between focus sharpness and brightness.
          </p>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   INTERACTIVE STEM LAB 4: PLAYABLE MUSICAL PILLARS (WEB AUDIO API)
   ============================================================================ */
const SAPTASWARA_PILLARS = [
  { swara: 'Sa', full: 'Shadja', freq: 261.63, ratio: '1 : 1', heightPct: 100 },
  { swara: 'Re', full: 'Rishabha', freq: 293.66, ratio: '9 : 8', heightPct: 93 },
  { swara: 'Ga', full: 'Gandhara', freq: 329.63, ratio: '5 : 4', heightPct: 87 },
  { swara: 'Ma', full: 'Madhyama', freq: 349.23, ratio: '4 : 3', heightPct: 82 },
  { swara: 'Pa', full: 'Panchama', freq: 392.0, ratio: '3 : 2', heightPct: 76 },
  { swara: 'Dha', full: 'Dhaivata', freq: 440.0, ratio: '5 : 3', heightPct: 70 },
  { swara: 'Ni', full: 'Nishada', freq: 493.88, ratio: '15 : 8', heightPct: 65 }
];

const MusicalPillarsLab = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [lastPlayed, setLastPlayed] = useState(SAPTASWARA_PILLARS[0]);
  const [isPlayingRaga, setIsPlayingRaga] = useState(false);
  const audioCtxRef = useRef(null);
  const ragaTimeoutsRef = useRef([]);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Synthesize an authentic stone-bell harmonic resonance
  const playStoneNote = useCallback(
    (index) => {
      const pillar = SAPTASWARA_PILLARS[index];
      setActiveIndex(index);
      setLastPlayed(pillar);

      try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const now = ctx.currentTime;
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, now);
        masterGain.gain.exponentialRampToValueAtTime(0.32, now + 0.012);
        masterGain.gain.exponentialRampToValueAtTime(0.0008, now + 1.45);
        masterGain.connect(ctx.destination);

        // Fundamental stone resonance + characteristic inharmonic granite overtones
        const partials = [
          { mult: 1.0, gain: 0.65, decay: 1.4 },
          { mult: 2.01, gain: 0.28, decay: 0.9 },
          { mult: 2.98, gain: 0.14, decay: 0.55 },
          { mult: 4.18, gain: 0.08, decay: 0.25 }
        ];

        partials.forEach(({ mult, gain, decay }) => {
          const osc = ctx.createOscillator();
          const pGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(pillar.freq * mult, now);

          pGain.gain.setValueAtTime(gain, now);
          pGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

          osc.connect(pGain);
          pGain.connect(masterGain);
          osc.start(now);
          osc.stop(now + decay + 0.05);
        });
      } catch {
        // Fallback gracefully if audio API is blocked
      }

      setTimeout(() => {
        setActiveIndex((curr) => (curr === index ? null : curr));
      }, 450);
    },
    [getAudioContext]
  );

  const stopRaga = useCallback(() => {
    ragaTimeoutsRef.current.forEach((t) => clearTimeout(t));
    ragaTimeoutsRef.current = [];
    setIsPlayingRaga(false);
  }, []);

  const playRagaSequence = () => {
    if (isPlayingRaga) {
      stopRaga();
      return;
    }
    setIsPlayingRaga(true);
    // Classical ascending & descending phrase inspired by Raga Yaman / Shankarabharanam
    const sequence = [0, 1, 2, 3, 4, 5, 6, 4, 2, 1, 0];
    sequence.forEach((pillarIdx, step) => {
      const t = setTimeout(() => {
        playStoneNote(pillarIdx);
        if (step === sequence.length - 1) {
          setTimeout(() => setIsPlayingRaga(false), 500);
        }
      }, step * 340);
      ragaTimeoutsRef.current.push(t);
    });
  };

  useEffect(() => {
    return () => stopRaga();
  }, [stopRaga]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-7 bg-[#1F070B]/85 border border-[#C59B38]/35 rounded-xl p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#DFBD69]">
            <Volume2 className="w-4 h-4" />
            <span>Tap Any Granite Pillar to Hear Its Tone</span>
          </div>
          <button
            type="button"
            onClick={playRagaSequence}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#C59B38] to-[#DFBD69] text-[#231510] text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 hover:brightness-110 transition shadow-md cursor-pointer"
          >
            {isPlayingRaga ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            {isPlayingRaga ? 'Stop Sequence' : 'Play Raga Sequence'}
          </button>
        </div>

        {/* Interactive Carved Granite Colonnettes */}
        <div className="relative flex items-end justify-between gap-2 sm:gap-3 h-64 px-2 sm:px-6 pt-8 pb-4 bg-gradient-to-b from-[#170508] to-[#2B0B10] rounded-lg border border-[#C59B38]/20 overflow-hidden">
          {/* Stone Arch Cornice Top */}
          <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-[#5C493F]/60 to-transparent border-b border-[#C59B38]/30" />

          {SAPTASWARA_PILLARS.map((p, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={p.swara}
                type="button"
                onClick={() => playStoneNote(idx)}
                aria-label={`Play ${p.full} (${p.swara}) granite pillar`}
                className="group relative flex-1 flex flex-col items-center justify-end h-full focus:outline-none cursor-pointer"
              >
                {/* Acoustic Wave Rings when struck */}
                {isActive && (
                  <span className="absolute top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-[#DFBD69] animate-ping pointer-events-none" />
                )}

                {/* Pillar Shaft */}
                <div
                  style={{ height: `${p.heightPct}%` }}
                  className={`relative w-full max-w-[46px] rounded-t-md border transition-all duration-200 flex flex-col justify-between items-center py-2 ${
                    isActive
                      ? 'bg-gradient-to-b from-[#DFBD69] via-[#C59B38] to-[#8C6239] border-[#FFF3C4] shadow-[0_0_25px_rgba(223,189,105,0.65)] scale-[1.03]'
                      : 'bg-gradient-to-b from-[#7B6454] via-[#5A463B] to-[#3B2C24] border-[#C59B38]/40 group-hover:border-[#DFBD69] group-hover:from-[#8C7260]'
                  }`}
                >
                  {/* Capital & Base Fluting Lines */}
                  <div className="w-[85%] h-1.5 rounded-full bg-black/25" />
                  <div className="flex flex-col items-center">
                    <span
                      className={`font-cinzel text-sm sm:text-base font-bold ${
                        isActive ? 'text-[#231510]' : 'text-[#FAF6EE]'
                      }`}
                    >
                      {p.swara}
                    </span>
                    <span
                      className={`text-[9px] font-mono hidden sm:block ${
                        isActive ? 'text-[#231510]/80' : 'text-[#DFBD69]/80'
                      }`}
                    >
                      {Math.round(p.freq)}Hz
                    </span>
                  </div>
                  <div className="w-[85%] h-2 rounded-sm bg-black/30" />
                </div>

                {/* Stone Plinth Base */}
                <div className="w-full max-w-[54px] h-2.5 bg-[#46342B] border-t border-[#C59B38]/40 rounded-b-sm" />
              </button>
            );
          })}
        </div>

        {/* Live Acoustic Telemetry Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#FAF6EE]/80 bg-[#2B0B10]/80 px-4 py-2.5 rounded-lg border border-[#C59B38]/25">
          <span>
            Active Swara: <strong className="text-[#DFBD69] font-cinzel">{lastPlayed.full} ({lastPlayed.swara})</strong>
          </span>
          <span className="font-mono">Fundamental: {lastPlayed.freq.toFixed(1)} Hz</span>
          <span className="font-mono text-[#DFBD69]">Harmonic Ratio: {lastPlayed.ratio}</span>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <span className="text-xs uppercase tracking-[0.2em] text-[#DFBD69]">Granite Acoustic Engineering</span>
        <h3 className="font-cinzel text-2xl sm:text-3xl text-[#FAF6EE]">
          Musical Pillars of Vijaya Vittala Temple
        </h3>
        <p className="text-[#FAF6EE]/80 text-sm sm:text-base leading-relaxed">
          Inside the 16th-century Ranga Mandapa at Hampi stand 56 monumental composite piers. Each massive pillar is
          carved from a <strong className="text-[#DFBD69]">single solid block of silica-rich granite</strong> into a
          load-bearing core surrounded by slender cylindrical colonnettes (<em>Saptaswara</em> pillars) tuned to produce
          clear resonant percussion and melodic pitches when gently tapped.
        </p>
        <div className="space-y-2.5 text-xs sm:text-sm text-[#FAF6EE]/85">
          <div className="flex items-start gap-2.5 bg-[#1F070B]/70 border border-[#C59B38]/25 rounded-lg p-3">
            <Music className="w-4 h-4 text-[#DFBD69] mt-0.5 flex-shrink-0" />
            <span>
              <strong>Standing-Wave Geometry:</strong> Slight variations in colonnette diameter, effective length, and
              cross-sectional carving precisely shift flexural vibration frequencies across the musical scale.
            </span>
          </div>
          <div className="flex items-start gap-2.5 bg-[#1F070B]/70 border border-[#C59B38]/25 rounded-lg p-3">
            <Hammer className="w-4 h-4 text-[#DFBD69] mt-0.5 flex-shrink-0" />
            <span>
              <strong>Material Acoustics:</strong> High quartz and metallic mineral inclusions in Hampi granite yield
              low internal damping—allowing stone columns to ring like temple bells.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   INTERACTIVE HERITAGE MAP OF INDIA (CARTOGRAPHIC MUSEUM PLATE)
   ============================================================================ */
const InteractiveHeritageMap = ({ onSelectMonument }) => {
  const [selectedId, setSelectedId] = useState('vijaya-vittala-hampi');
  const activeMonument = useMemo(
    () => MONUMENTS.find((m) => m.id === selectedId) || MONUMENTS[0],
    [selectedId]
  );

  // Mathematically projected geographic silhouette of India (viewBox 0 0 500 560)
  const indiaPath =
    'M 138 25 L 182 50 L 206 74 L 199 131 L 217 166 L 264 194 L 327 208 L 338 183 L 366 204 L 417 174 L 461 181 L 444 216 L 424 245 L 399 289 L 380 254 L 355 232 L 335 255 L 342 292 L 311 319 L 262 364 L 227 398 L 218 445 L 211 495 L 178 533 L 159 500 L 138 449 L 124 405 L 109 342 L 107 303 L 82 312 L 54 285 L 72 275 L 47 259 L 66 203 L 104 158 L 136 120 L 121 69 Z';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: Cartographic SVG Map */}
      <div className="lg:col-span-7 relative bg-gradient-to-br from-[#F4ECDC] via-[#EFE4CE] to-[#E5D6B8] border-2 border-[#C59B38]/45 rounded-2xl p-4 sm:p-6 shadow-xl overflow-hidden">
        {/* Decorative Antique Corner Framing */}
        <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-[#8C6239]/50 pointer-events-none" />
        <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-[#8C6239]/50 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-[#8C6239]/50 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-[#8C6239]/50 pointer-events-none" />

        <div className="flex items-center justify-between mb-2 relative z-10">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#8C6239] font-semibold">
              Cartographic Heritage Atlas
            </span>
            <h3 className="font-cinzel text-lg sm:text-xl text-[#3E0D16]">
              10 Featured Monuments Across India
            </h3>
          </div>
          <Compass className="w-6 h-6 text-[#8C6239] opacity-80" />
        </div>

        <svg viewBox="0 0 500 560" className="w-full max-w-lg mx-auto h-auto select-none" role="img" aria-label="Interactive Map of Indian Heritage Monuments">
          <defs>
            <linearGradient id="indiaLand" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF3E3" />
              <stop offset="100%" stopColor="#E6D5B3" />
            </linearGradient>
            <filter id="landShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#5C1420" floodOpacity="0.16" />
            </filter>
          </defs>

          {/* Subtle Latitude & Longitude Graticule */}
          {[100, 200, 300, 400, 500].map((y) => (
            <line key={`lat-${y}`} x1="20" y1={y} x2="480" y2={y} stroke="#8C6239" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.28" />
          ))}
          {[100, 200, 300, 400].map((x) => (
            <line key={`lon-${x}`} x1={x} y1="15" x2={x} y2="545" stroke="#8C6239" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.28" />
          ))}

          {/* Ocean Typography */}
          <text x="58" y="425" fill="#8C6239" fontSize="11" fontStyle="italic" opacity="0.55" letterSpacing="2">
            ARABIAN SEA
          </text>
          <text x="292" y="425" fill="#8C6239" fontSize="11" fontStyle="italic" opacity="0.55" letterSpacing="2">
            BAY OF BENGAL
          </text>
          <text x="195" y="550" fill="#8C6239" fontSize="10" fontStyle="italic" opacity="0.55" letterSpacing="3">
            INDIAN OCEAN
          </text>

          {/* Antique Compass Rose */}
          <g transform="translate(415, 480)" opacity="0.65">
            <circle cx="0" cy="0" r="26" stroke="#8C6239" strokeWidth="1" fill="none" />
            <circle cx="0" cy="0" r="22" stroke="#8C6239" strokeWidth="0.6" strokeDasharray="2 2" fill="none" />
            <polygon points="0,-24 4,0 0,6 -4,0" fill="#5C1420" />
            <polygon points="0,24 4,0 0,-6 -4,0" fill="#C59B38" />
            <polygon points="-24,0 0,-4 6,0 0,4" fill="#8C6239" opacity="0.7" />
            <polygon points="24,0 0,-4 -6,0 0,4" fill="#8C6239" opacity="0.7" />
            <text x="0" y="-29" textAnchor="middle" fill="#5C1420" fontSize="9" fontWeight="bold">N</text>
          </g>

          {/* India Landmass */}
          <path
            d={indiaPath}
            fill="url(#indiaLand)"
            stroke="#8C6239"
            strokeWidth="1.8"
            strokeLinejoin="round"
            filter="url(#landShadow)"
          />

          {/* Subtle Regional Reference Labels */}
          <text x="108" y="218" fill="#8C6239" fontSize="8.5" opacity="0.55" letterSpacing="1">RAJASTHAN</text>
          <text x="210" y="222" fill="#8C6239" fontSize="8.5" opacity="0.55" letterSpacing="1">UTTAR PRADESH</text>
          <text x="148" y="346" fill="#8C6239" fontSize="8.5" opacity="0.55" letterSpacing="1">MAHARASHTRA</text>
          <text x="115" y="428" fill="#8C6239" fontSize="8" opacity="0.55" letterSpacing="1">KARNATAKA</text>
          <text x="216" y="472" fill="#8C6239" fontSize="8" opacity="0.55" letterSpacing="1">TAMIL NADU</text>

          {/* Heritage Connecting Heritage Arc Line (subtle) */}
          <path
            d="M 153 202 Q 190 200 227 203 T 188 244 Q 160 285 144 324 T 163 406 T 169 460 Q 192 458 209 450"
            fill="none"
            stroke="#C59B38"
            strokeWidth="1.1"
            strokeDasharray="3 4"
            opacity="0.5"
          />

          {/* Interactive Monument Pins */}
          {MONUMENTS.map((m, idx) => {
            const isSelected = m.id === selectedId;
            return (
              <g
                key={m.id}
                transform={`translate(${m.mapCoords.x}, ${m.mapCoords.y})`}
                onClick={() => setSelectedId(m.id)}
                className="cursor-pointer group"
                role="button"
                tabIndex={0}
                aria-label={`Select ${m.name}, ${m.location}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedId(m.id);
                  }
                }}
              >
                {isSelected && (
                  <circle r="17" fill="#C59B38" opacity="0.28">
                    <animate attributeName="r" values="10;20;10" dur="2.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.45;0.1;0.45" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  r={isSelected ? 9.5 : 6.8}
                  fill={isSelected ? '#5C1420' : '#C59B38'}
                  stroke="#FAF6EE"
                  strokeWidth={isSelected ? 2.5 : 1.8}
                />
                <text
                  y="3"
                  textAnchor="middle"
                  fill="#FAF6EE"
                  fontSize={isSelected ? '8.5' : '7'}
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {idx + 1}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Quick Monument Selector Chips for Effortless Mobile & Desktop Exploration */}
        <div className="mt-4 pt-3 border-t border-[#C59B38]/30 flex flex-wrap gap-1.5">
          {MONUMENTS.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedId(m.id)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition cursor-pointer ${
                m.id === selectedId
                  ? 'bg-[#5C1420] text-[#DFBD69] shadow-sm'
                  : 'bg-[#FAF6EE]/80 text-[#3E0D16] hover:bg-[#5C1420]/10 border border-[#C59B38]/35'
              }`}
            >
              {idx + 1}. {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Museum Map Inspection Card */}
      <div className="lg:col-span-5">
        <div className="bg-[#FAF6EE] border border-[#C59B38]/50 rounded-2xl overflow-hidden shadow-xl">
          <div className="relative h-60 sm:h-64 overflow-hidden">
            <HeritageImage
              src={activeMonument.heroImage}
              fallbackSrc={activeMonument.fallbackImage}
              alt={activeMonument.name}
              title={activeMonument.name}
              subtitle={activeMonument.location}
              silhouetteType={activeMonument.silhouetteType}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#231510]/85 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-[#2B0B10]/85 backdrop-blur-md border border-[#DFBD69]/50 text-[#DFBD69] text-xs font-medium">
                {activeMonument.era}
              </span>
            </div>
            <div className="absolute bottom-4 left-5 right-5 text-[#FAF6EE]">
              <div className="flex items-center gap-1.5 text-xs text-[#DFBD69] mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeMonument.location}</span>
              </div>
              <h4 className="font-cinzel text-2xl font-semibold">{activeMonument.name}</h4>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              {activeMonument.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-2.5 py-0.5 text-[11px] uppercase tracking-wider rounded bg-[#F3EBD8] text-[#5C1420] border border-[#C59B38]/40 font-semibold"
                >
                  {cat}
                </span>
              ))}
            </div>

            <p className="text-[#5C493F] text-sm leading-relaxed">{activeMonument.shortDesc}</p>

            <div className="grid grid-cols-2 gap-3 pt-1 text-xs border-t border-[#C59B38]/25">
              <div className="pt-2">
                <span className="text-[#8C6239] uppercase tracking-wider text-[10px] block">Patron / Builder</span>
                <span className="text-[#231510] font-medium line-clamp-2">{activeMonument.builtBy}</span>
              </div>
              <div className="pt-2">
                <span className="text-[#8C6239] uppercase tracking-wider text-[10px] block">Architectural Style</span>
                <span className="text-[#231510] font-medium line-clamp-2">{activeMonument.architecturalStyle}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectMonument(activeMonument.id)}
              className="w-full mt-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#5C1420] to-[#3E0D16] text-[#FAF6EE] font-medium text-sm tracking-wide flex items-center justify-center gap-2 hover:from-[#6D1827] hover:to-[#5C1420] transition shadow-md cursor-pointer border border-[#C59B38]/40"
            >
              <span>Explore Monument Details</span>
              <ArrowRight className="w-4 h-4 text-[#DFBD69]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   FULL-SCREEN MUSEUM LIGHTBOX COMPONENT
   ============================================================================ */
const MuseumLightbox = ({ items, currentIndex, onClose, onNavigate, onExploreMonument }) => {
  const item = items[currentIndex];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#140407]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[#24090E] border border-[#C59B38]/45 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-[#140407]/80 text-[#FAF6EE] hover:text-[#DFBD69] border border-[#C59B38]/40 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Stage */}
        <div className="lg:col-span-7 relative bg-[#120306] flex items-center justify-center min-h-[280px] sm:min-h-[400px] max-h-[55vh] lg:max-h-[85vh]">
          <HeritageImage
            src={item.image}
            alt={item.title}
            title={item.title}
            subtitle={item.monument}
            className="w-full h-full object-contain max-h-[55vh] lg:max-h-[85vh]"
            containerClassName="w-full h-full flex items-center justify-center bg-[#120306]"
          />

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#140407]/75 hover:bg-[#5C1420] text-[#FAF6EE] border border-[#C59B38]/40 transition cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate((currentIndex + 1) % items.length)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#140407]/75 hover:bg-[#5C1420] text-[#FAF6EE] border border-[#C59B38]/40 transition cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Curatorial Plaque */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[37vh] lg:max-h-[85vh]">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#DFBD69]">
              <span>Exhibit {currentIndex + 1} of {items.length}</span>
              {item.era && <span>{item.era}</span>}
            </div>
            <h3 className="font-cinzel text-2xl text-[#FAF6EE] leading-snug">{item.title}</h3>
            {item.monument && (
              <div className="flex items-center gap-1.5 text-sm text-[#DFBD69]/90">
                <MapPin className="w-4 h-4" />
                <span>{item.monument}</span>
              </div>
            )}
            <div className="h-[1px] bg-[#C59B38]/30" />
            <p className="text-[#FAF6EE]/85 text-sm leading-relaxed">{item.description}</p>
            {item.significance && (
              <div className="bg-[#180509] border-l-2 border-[#DFBD69] p-3.5 rounded-r-lg">
                <div className="text-[11px] uppercase tracking-wider text-[#DFBD69] font-semibold mb-1">
                  Artistic & Cultural Significance
                </div>
                <p className="text-xs sm:text-sm text-[#FAF6EE]/80 leading-relaxed">{item.significance}</p>
              </div>
            )}
          </div>

          {item.monumentId && onExploreMonument && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onExploreMonument(item.monumentId);
              }}
              className="mt-6 w-full py-2.5 px-4 rounded-lg bg-[#C59B38] hover:bg-[#DFBD69] text-[#231510] font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Visit Source Monument Dossier</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   INDIVIDUAL MONUMENT DETAIL PAGE VIEW
   ============================================================================ */
const MonumentDetailPage = ({ monument, onBack, onSelectMonument, onOpenLightbox }) => {
  const currentIdx = MONUMENTS.findIndex((m) => m.id === monument.id);
  const prevMonument = MONUMENTS[(currentIdx - 1 + MONUMENTS.length) % MONUMENTS.length];
  const nextMonument = MONUMENTS[(currentIdx + 1) % MONUMENTS.length];

  const galleryLightboxItems = monument.gallery.map((g) => ({
    title: g.caption,
    monument: `${monument.name} — ${monument.location}`,
    era: monument.era,
    image: g.url,
    description: `${monument.name} (${monument.year}): ${g.caption}.`,
    significance: monument.significance
  }));

  return (
    <div className="pt-20 bg-[#FAF6EE] min-h-screen animate-fadeIn">
      {/* Full-Bleed Atmospheric Header */}
      <div className="relative h-[58vh] min-h-[420px] max-h-[600px] w-full overflow-hidden">
        <HeritageImage
          src={monument.heroImage}
          fallbackSrc={monument.fallbackImage}
          alt={monument.name}
          title={monument.name}
          subtitle={monument.location}
          silhouetteType={monument.silhouetteType}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E070B] via-[#2B0B10]/55 to-[#1E070B]/40" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-8">
          {/* Breadcrumb & Back */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F070B]/75 backdrop-blur-md border border-[#DFBD69]/40 text-[#FAF6EE] hover:text-[#DFBD69] text-sm transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Monuments</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#FAF6EE]/80 bg-[#1F070B]/60 backdrop-blur-md px-4 py-2 rounded-full border border-[#C59B38]/30">
              <span>Indian Marvels</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#DFBD69]" />
              <span>Monuments</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#DFBD69]" />
              <span className="text-[#DFBD69]">{monument.name}</span>
            </div>
          </div>

          {/* Monument Hero Title */}
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#C59B38] text-[#231510] text-xs font-bold uppercase tracking-wider">
                {monument.era}
              </span>
              {monument.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-full bg-[#FAF6EE]/15 backdrop-blur-sm border border-[#FAF6EE]/30 text-[#FAF6EE] text-xs tracking-wider uppercase"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FAF6EE] tracking-wide">
              {monument.name}
            </h1>
            <p className="mt-2.5 flex items-center gap-2 text-[#DFBD69] text-base sm:text-lg font-cormorant italic">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{monument.location} • {monument.region}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Quick Facts Metadata Bar */}
      <div className="bg-[#2B0B10] border-y border-[#C59B38]/40 text-[#FAF6EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-[#DFBD69] mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#DFBD69]/80">Built By</div>
              <div className="text-sm font-medium mt-0.5">{monument.builtBy}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#DFBD69] mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#DFBD69]/80">Period / Year</div>
              <div className="text-sm font-medium mt-0.5">{monument.year}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-[#DFBD69] mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#DFBD69]/80">Architectural Tradition</div>
              <div className="text-sm font-medium mt-0.5">{monument.architecturalStyle}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Hammer className="w-5 h-5 text-[#DFBD69] mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#DFBD69]/80">Materials & Technique</div>
              <div className="text-sm font-medium mt-0.5">{monument.materials}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Body Dossier */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {/* Two-Column Historical Background & About */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-[#F3EBD8]/70 border border-[#C59B38]/35 rounded-2xl p-7 sm:p-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C6239] font-semibold mb-2">
              <ScrollText className="w-4 h-4 text-[#C59B38]" />
              <span>Historical Background</span>
            </div>
            <h2 className="font-cinzel text-2xl text-[#3E0D16] mb-4">Origins & Royal Patronage</h2>
            <p className="text-[#3C2B23] leading-relaxed text-[15px] sm:text-base">
              {monument.historicalBackground}
            </p>
          </div>

          <div className="bg-[#F3EBD8]/70 border border-[#C59B38]/35 rounded-2xl p-7 sm:p-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C6239] font-semibold mb-2">
              <Landmark className="w-4 h-4 text-[#C59B38]" />
              <span>Architectural Overview</span>
            </div>
            <h2 className="font-cinzel text-2xl text-[#3E0D16] mb-4">About the Monument</h2>
            <p className="text-[#3C2B23] leading-relaxed text-[15px] sm:text-base">
              {monument.about}
            </p>
          </div>
        </div>

        {/* Unique Architectural Features Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-[0.22em] text-[#8C6239] font-semibold">
              Engineering & Design Highlights
            </span>
            <h2 className="font-cinzel text-3xl text-[#3E0D16] mt-1">Unique Architectural Features</h2>
            <LotusDivider />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monument.uniqueFeatures.map((feat, idx) => (
              <div
                key={feat.title}
                className="bg-white/75 border border-[#C59B38]/40 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-[#5C1420] text-[#DFBD69] font-cinzel font-bold flex items-center justify-center flex-shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-semibold text-[#3E0D16]">{feat.title}</h3>
                    <p className="text-sm text-[#5C493F] leading-relaxed mt-1.5">{feat.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sculptures + Cultural Significance Two-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-gradient-to-br from-[#3E0D16] to-[#26070D] text-[#FAF6EE] rounded-2xl p-8 border border-[#C59B38]/40 relative overflow-hidden">
            <MandalaWatermark className="absolute -bottom-16 -right-16 w-64 h-64" color="#DFBD69" opacity={0.08} />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-[0.2em] text-[#DFBD69]">Iconography & Craftsmanship</span>
              <h3 className="font-cinzel text-2xl mt-1 mb-4">Important Sculptures & Carvings</h3>
              <p className="text-[#FAF6EE]/85 leading-relaxed text-sm sm:text-base">{monument.sculptures}</p>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F3EBD8] rounded-2xl p-8 border border-[#C59B38]/45">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C6239] font-semibold">Enduring Legacy</span>
            <h3 className="font-cinzel text-2xl text-[#3E0D16] mt-1 mb-4">Cultural & Historical Significance</h3>
            <p className="text-[#3C2B23] leading-relaxed text-sm sm:text-base">{monument.significance}</p>
          </div>
        </div>

        {/* Historical Timeline Strip */}
        <div className="bg-white/70 border border-[#C59B38]/40 rounded-2xl p-7 sm:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C6239] font-semibold mb-1">
            <Clock className="w-4 h-4 text-[#C59B38]" />
            <span>Chronological Milestones</span>
          </div>
          <h3 className="font-cinzel text-2xl text-[#3E0D16] mb-6">Historical Timeline</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {monument.timeline.map((t, idx) => (
              <div key={idx} className="relative pl-5 border-l-2 border-[#C59B38]">
                <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-[#5C1420] border-2 border-[#DFBD69]" />
                <div className="font-cinzel text-sm font-bold text-[#5C1420]">{t.year}</div>
                <p className="text-xs sm:text-sm text-[#5C493F] mt-1 leading-relaxed">{t.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photographic Gallery Strip */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C6239] font-semibold">Visual Archive</span>
              <h3 className="font-cinzel text-2xl sm:text-3xl text-[#3E0D16]">Monument Gallery</h3>
            </div>
            <span className="text-xs text-[#5C493F] hidden sm:inline">Click any photograph for full-screen view</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {monument.gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onOpenLightbox(galleryLightboxItems, idx)}
                className="group text-left bg-white rounded-xl overflow-hidden border border-[#C59B38]/35 shadow-sm hover:shadow-xl transition cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <HeritageImage
                    src={img.url}
                    fallbackSrc={monument.fallbackImage}
                    alt={img.caption}
                    title={monument.name}
                    silhouetteType={monument.silhouetteType}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-[#231510]/0 group-hover:bg-[#231510]/30 transition flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition bg-[#2B0B10]/85 text-[#DFBD69] p-2.5 rounded-full border border-[#DFBD69]/50">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                  </div>
                </div>
                <div className="p-3.5 text-xs sm:text-sm text-[#3C2B23] font-medium">{img.caption}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Academic Archival Note */}
        <div className="flex items-start gap-3 bg-[#F3EBD8] border border-[#C59B38]/40 rounded-xl p-4 text-xs text-[#5C493F]">
          <Info className="w-4 h-4 text-[#8C6239] mt-0.5 flex-shrink-0" />
          <p>
            <strong>Academic Archival Note:</strong> Historical dates, patronage records, and structural descriptions
            above reflect verified archival documentation aligned with the <em>Indian Marvels</em> IKS curriculum study
            (Walchand College of Engineering, Sangli) and Archaeological Survey of India / UNESCO heritage records.
          </p>
        </div>

        {/* Previous / Next Monument Navigation */}
        <div className="pt-6 border-t border-[#C59B38]/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onSelectMonument(prevMonument.id)}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/80 hover:bg-[#F3EBD8] border border-[#C59B38]/40 transition text-left cursor-pointer group"
          >
            <ArrowLeft className="w-5 h-5 text-[#5C1420] group-hover:-translate-x-1 transition flex-shrink-0" />
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8C6239] block">Previous Monument</span>
              <span className="font-cinzel text-base font-semibold text-[#3E0D16]">{prevMonument.name}</span>
              <span className="text-xs text-[#5C493F] block">{prevMonument.location}</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onSelectMonument(nextMonument.id)}
            className="flex items-center justify-end gap-4 p-4 rounded-xl bg-white/80 hover:bg-[#F3EBD8] border border-[#C59B38]/40 transition text-right cursor-pointer group"
          >
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8C6239] block">Next Monument</span>
              <span className="font-cinzel text-base font-semibold text-[#3E0D16]">{nextMonument.name}</span>
              <span className="text-xs text-[#5C493F] block">{nextMonument.location}</span>
            </div>
            <ArrowRight className="w-5 h-5 text-[#5C1420] group-hover:translate-x-1 transition flex-shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   MAIN APPLICATION COMPONENT
   ============================================================================ */
export default function App() {
  const [selectedMonumentId, setSelectedMonumentId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeArchId, setActiveArchId] = useState(ARCHITECTURAL_TRADITIONS[0].id);
  const [activeStemTab, setActiveStemTab] = useState('samrat');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxState, setLightboxState] = useState({ open: false, items: [], index: 0 });

  // Inject Google Fonts ('Cinzel', 'Cormorant Garamond', 'Plus Jakarta Sans') cleanly once
  useEffect(() => {
    const id = 'indian-marvels-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
    document.title = 'INDIAN MARVELS — Interactive Indian Heritage Experience | WCE Sangli';
  }, []);

  // Track scroll for glassmorphic navbar polish
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Filter monuments
  const filteredMonuments = useMemo(() => {
    if (activeCategory === 'All') return MONUMENTS;
    return MONUMENTS.filter((m) => m.categories.includes(activeCategory));
  }, [activeCategory]);

  const selectedMonument = useMemo(
    () => MONUMENTS.find((m) => m.id === selectedMonumentId) || null,
    [selectedMonumentId]
  );

  const activeArchitecture = useMemo(
    () => ARCHITECTURAL_TRADITIONS.find((a) => a.id === activeArchId) || ARCHITECTURAL_TRADITIONS[0],
    [activeArchId]
  );

  // Smooth navigation handler (works seamlessly from Detail View OR Home View)
  const navigateToSection = useCallback((sectionId) => {
    setMobileMenuOpen(false);
    if (selectedMonumentId) {
      setSelectedMonumentId(null);
      setTimeout(() => {
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    } else {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedMonumentId]);

  const openMonumentDetail = useCallback((monumentId) => {
    setSelectedMonumentId(monumentId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openLightbox = useCallback((items, index) => {
    setLightboxState({ open: true, items, index });
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About Project', id: 'about' },
    { label: 'Explore Monuments', id: 'monuments' },
    { label: 'Architecture', id: 'architecture' },
    { label: 'Sculpture Gallery', id: 'sculptures' },
    { label: 'Science & Innovation', id: 'science' },
    { label: 'Map', id: 'map' },
    { label: 'Our Team', id: 'team' },
    { label: 'References', id: 'references' }
  ];

  const categories = ['All', 'Temples', 'Architecture', 'Astronomy', 'Monuments'];

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#231510] font-sans selection:bg-[#C59B38]/30 selection:text-[#3E0D16] overflow-x-hidden">
      {/* Custom Museum Typography & Subtle Motion Styles */}
      <style>{`
        .font-cinzel { font-family: 'Cinzel', Georgia, serif; }
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; }
        html { scroll-behavior: smooth; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slowZoom {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.08); }
        }
        .animate-fadeUp { animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .animate-fadeUp-delay-1 { opacity: 0; animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards; }
        .animate-fadeUp-delay-2 { opacity: 0; animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards; }
        .animate-fadeUp-delay-3 { opacity: 0; animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.6s forwards; }
        .animate-fadeIn { animation: fadeIn 0.45s ease-out forwards; }
        .animate-heroZoom { animation: slowZoom 24s ease-in-out infinite alternate; }
        .parchment-texture {
          background-image: radial-gradient(rgba(140, 98, 57, 0.06) 1px, transparent 0);
          background-size: 24px 24px;
        }
      `}</style>

      {/* ====================================================================
          1. STICKY GLASSMORPHIC NAVIGATION BAR
         ==================================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || selectedMonument
            ? 'bg-[#26080E]/92 backdrop-blur-md border-b border-[#C59B38]/35 shadow-lg py-2.5'
            : 'bg-gradient-to-b from-[#1D060A]/85 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Emblem + Brand */}
          <button
            type="button"
            onClick={() => navigateToSection('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <TempleEmblem className="w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-105 transition-transform" />
            <div>
              <span className="font-cinzel text-base sm:text-lg font-bold tracking-[0.16em] text-[#FAF6EE] block leading-none">
                INDIAN MARVELS
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#DFBD69]/90 hidden sm:block mt-1">
                Digital Heritage Museum • IKS
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => navigateToSection(link.id)}
                className="px-3 py-2 text-xs font-medium tracking-wider uppercase text-[#FAF6EE]/85 hover:text-[#DFBD69] transition-colors relative group cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-1 left-3 right-3 h-[1.5px] bg-[#DFBD69] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle Menu"
            className="xl:hidden p-2.5 rounded-lg border border-[#C59B38]/40 text-[#FAF6EE] hover:text-[#DFBD69] bg-[#2B0B10]/60 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#24080D]/98 backdrop-blur-lg border-t border-[#C59B38]/30 px-4 py-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => navigateToSection(link.id)}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium tracking-wide text-[#FAF6EE] hover:bg-[#5C1420]/70 hover:text-[#DFBD69] transition cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          CONDITIONAL VIEW: MONUMENT DETAIL PAGE vs. MAIN DIGITAL MUSEUM
         ==================================================================== */}
      {selectedMonument ? (
        <MonumentDetailPage
          monument={selectedMonument}
          onBack={() => navigateToSection('monuments')}
          onSelectMonument={openMonumentDetail}
          onOpenLightbox={openLightbox}
        />
      ) : (
        <main>
          {/* ================================================================
              2. FULL-SCREEN CINEMATIC HERO SECTION
             ================================================================ */}
          <section
            id="home"
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#1B060A]"
          >
            {/* Cinematic Background Photography */}
            <div className="absolute inset-0">
              <div className="w-full h-full animate-heroZoom">
                <HeritageImage
                  src={wikiImg('Stone_Chariot_Vittala_Temple.jpg', 1800)}
                  fallbackSrc={wikiImg('Kailasa_Temple_at_Ellora_Caves.jpg', 1600)}
                  alt="Vijaya Vittala Temple Stone Chariot at Hampi"
                  title="Vijaya Vittala Temple Stone Chariot"
                  silhouetteType="chariot"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              {/* Museum Dark Maroon-Espresso Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1D0509]/80 via-[#2B0B10]/65 to-[#1E060B]/92" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(22,4,8,0.72)_100%)]" />
            </div>

            {/* Subtle Center Mandala Aura */}
            <MandalaWatermark
              className="absolute w-[620px] h-[620px] sm:w-[780px] sm:h-[780px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              color="#DFBD69"
              opacity={0.07}
            />

            {/* Hero Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20 pb-16">
              {/* Top Academic Metadata Badge */}
              <div className="animate-fadeUp inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#2B0B10]/70 backdrop-blur-md border border-[#DFBD69]/45 text-[#DFBD69] text-[11px] sm:text-xs tracking-[0.16em] uppercase mb-7 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Indian Knowledge System | Walchand College of Engineering, Sangli | 2026–27</span>
              </div>

              {/* Animated Display Title */}
              <h1 className="animate-fadeUp-delay-1 font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-[0.14em] text-[#FAF6EE] leading-[1.08] drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]">
                INDIAN <span className="text-[#DFBD69]">MARVELS</span>
              </h1>

              <LotusDivider light className="my-6 animate-fadeUp-delay-1" />

              {/* Subtitle */}
              <p className="animate-fadeUp-delay-2 font-cormorant text-2xl sm:text-3xl md:text-4xl text-[#FAF6EE] font-medium max-w-3xl mx-auto leading-snug">
                Discovering India’s Timeless Knowledge, Engineering & Architectural Brilliance.
              </p>

              {/* Supporting Quote */}
              <p className="animate-fadeUp-delay-2 mt-4 text-sm sm:text-base md:text-lg text-[#FAF6EE]/80 font-light max-w-2xl mx-auto leading-relaxed italic font-cormorant">
                “Journey through centuries of Indian innovation, artistic excellence and architectural wonders.”
              </p>

              {/* Action Buttons */}
              <div className="animate-fadeUp-delay-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => navigateToSection('monuments')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C59B38] via-[#DFBD69] to-[#C59B38] text-[#231510] font-semibold text-sm tracking-[0.14em] uppercase shadow-[0_8px_30px_rgba(197,155,56,0.38)] hover:brightness-110 hover:-translate-y-0.5 transition flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>Explore Heritage</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateToSection('map')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2B0B10]/65 backdrop-blur-md border border-[#DFBD69]/55 text-[#FAF6EE] hover:bg-[#5C1420]/70 hover:text-[#DFBD69] font-medium text-sm tracking-[0.14em] uppercase transition flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#DFBD69]" />
                  <span>Interactive Map</span>
                </button>
              </div>
            </div>

            {/* Scroll-Down Indicator */}
            <button
              type="button"
              onClick={() => navigateToSection('about')}
              aria-label="Scroll to About Project"
              className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-[#DFBD69]/85 hover:text-[#FAF6EE] transition cursor-pointer"
            >
              <span className="text-[10px] uppercase tracking-[0.25em]">Scroll to Enter</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </section>

          {/* ================================================================
              3. ABOUT OUR PROJECT (EDITORIAL MUSEUM INTRODUCTION)
             ================================================================ */}
          <section id="about" className="relative py-20 sm:py-28 bg-[#FAF6EE] parchment-texture overflow-hidden">
            <MandalaWatermark className="absolute -right-32 top-1/2 -translate-y-1/2 w-[520px] h-[520px]" color="#8C6239" opacity={0.055} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Editorial Narrative */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#8C6239] font-semibold">
                    <BookOpen className="w-4 h-4 text-[#C59B38]" />
                    <span>About Our IKS Exhibition</span>
                  </div>
                  <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#3E0D16] leading-tight">
                    Rediscovering India’s Glorious Heritage
                  </h2>

                  <div className="border-l-2 border-[#C59B38] pl-5 sm:pl-6 space-y-4">
                    <p className="font-cormorant text-xl sm:text-2xl text-[#5C1420] italic leading-relaxed">
                      Every temple spire, monolithic cliff sanctuary, vaulted chamber, and marble sundial in India is a
                      living textbook of mathematics, materials science, acoustics, and sacred aesthetics.
                    </p>
                    <p className="text-[#4A382E] leading-relaxed text-sm sm:text-base">
                      Conceived under the <strong>Indian Knowledge System (IKS)</strong> curriculum at{' '}
                      <strong>Walchand College of Engineering, Sangli</strong>, <em>Indian Marvels</em> curates ten
                      extraordinary monuments spanning from the 5th-century Gupta Golden Age to 18th-century astronomical
                      and vaulted engineering. Rather than viewing heritage solely as ruins of the past, this digital
                      museum illuminates the scientific reasoning, acoustic craft, optical mastery, and structural
                      ingenuity embedded in India’s historic monuments.
                    </p>
                  </div>
                </div>

                {/* Right Grounded Curatorial Statistics */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                  {[
                    {
                      value: '10',
                      label: 'Featured Monuments',
                      sub: 'Curated across Karnataka, Maharashtra, Rajasthan, Tamil Nadu & Uttar Pradesh'
                    },
                    {
                      value: '6',
                      label: 'Architectural Traditions',
                      sub: 'Hoysala, Dravidian, Vijayanagara, Rock-Cut, Gupta Nagara & Astronomical'
                    },
                    {
                      value: '15+ Centuries',
                      label: 'Span of Living Heritage',
                      sub: 'Tracing Indian ingenuity from c. 500 CE to the 18th Century CE'
                    }
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-[#F3EBD8]/90 border border-[#C59B38]/45 rounded-2xl p-6 shadow-sm hover:shadow-md transition relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#5C1420] to-[#C59B38]" />
                      <div className="pl-2">
                        <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#5C1420]">
                          {stat.value}
                        </div>
                        <div className="font-cinzel text-sm font-semibold uppercase tracking-wider text-[#231510] mt-1">
                          {stat.label}
                        </div>
                        <p className="text-xs text-[#5C493F] mt-1.5 leading-relaxed">{stat.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              4. EXPLORE THE MONUMENTS (EXACT 10 MONUMENTS + FILTERS)
             ================================================================ */}
          <section id="monuments" className="py-20 sm:py-28 bg-[#F3EBD8] border-y border-[#C59B38]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-xs uppercase tracking-[0.24em] text-[#8C6239] font-semibold">
                  Permanent Curatorial Collection
                </span>
                <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#3E0D16] mt-2">
                  Explore the Monuments
                </h2>
                <LotusDivider />
                <p className="text-[#5C493F] text-sm sm:text-base mt-2">
                  Select any of the ten featured landmarks to enter its dedicated museum dossier with historical
                  background, architectural features, timelines, and photographic archive.
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-9 mb-12">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  const count =
                    cat === 'All'
                      ? MONUMENTS.length
                      : MONUMENTS.filter((m) => m.categories.includes(cat)).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? 'bg-[#5C1420] text-[#DFBD69] shadow-md border border-[#C59B38]'
                          : 'bg-[#FAF6EE] text-[#3E0D16] border border-[#C59B38]/40 hover:border-[#5C1420]'
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                          isActive ? 'bg-[#DFBD69]/20 text-[#DFBD69]' : 'bg-[#EAE0CC] text-[#5C493F]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Monument Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredMonuments.map((monument) => (
                  <article
                    key={monument.id}
                    className="group bg-[#FAF6EE] rounded-2xl overflow-hidden border border-[#C59B38]/40 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    {/* Photograph with Smooth Hover Zoom */}
                    <div
                      onClick={() => openMonumentDetail(monument.id)}
                      className="relative h-64 overflow-hidden cursor-pointer"
                    >
                      <HeritageImage
                        src={monument.heroImage}
                        fallbackSrc={monument.fallbackImage}
                        alt={`${monument.name}, ${monument.location}`}
                        title={monument.name}
                        subtitle={monument.location}
                        silhouetteType={monument.silhouetteType}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#231510]/80 via-[#231510]/15 to-transparent" />

                      {/* Era Pill */}
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#2B0B10]/80 backdrop-blur-md border border-[#DFBD69]/45 text-[#DFBD69] text-[11px] font-medium">
                        {monument.era}
                      </span>

                      {/* Location Tag */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 text-xs text-[#FAF6EE]/95">
                        <MapPin className="w-3.5 h-3.5 text-[#DFBD69] flex-shrink-0" />
                        <span className="font-medium tracking-wide">{monument.location}</span>
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-2.5">
                          {monument.categories.map((c) => (
                            <span
                              key={c}
                              className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#EAE0CC] text-[#5C1420] font-semibold"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-cinzel text-xl font-bold text-[#3E0D16] group-hover:text-[#5C1420] transition">
                          {monument.name}
                        </h3>
                        <p className="mt-2.5 text-sm text-[#5C493F] leading-relaxed">
                          {monument.shortDesc}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#C59B38]/25 flex items-center justify-between">
                        <span className="text-xs text-[#8C6239] font-medium">{monument.year}</span>
                        <button
                          type="button"
                          onClick={() => openMonumentDetail(monument.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5C1420] hover:text-[#8C6239] transition cursor-pointer"
                        >
                          <span>Explore More</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ================================================================
              5. ARCHITECTURE SHOWCASE (6 TRADITIONS)
             ================================================================ */}
          <section id="architecture" className="relative py-20 sm:py-28 bg-[#FAF6EE] overflow-hidden">
            <MandalaWatermark className="absolute -left-40 top-24 w-[480px] h-[480px]" color="#8C6239" opacity={0.05} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs uppercase tracking-[0.24em] text-[#8C6239] font-semibold">
                  Structural Grammar & Vastu Engineering
                </span>
                <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#3E0D16] mt-2">
                  Indian Architectural Traditions
                </h2>
                <LotusDivider />
                <p className="text-[#5C493F] text-sm sm:text-base">
                  Explore six monumental schools of sacred and scientific architecture that shaped the Indian
                  subcontinent across fifteen centuries.
                </p>
              </div>

              {/* Tradition Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
                {ARCHITECTURAL_TRADITIONS.map((arch) => {
                  const isActive = arch.id === activeArchId;
                  return (
                    <button
                      key={arch.id}
                      type="button"
                      onClick={() => setActiveArchId(arch.id)}
                      className={`p-3.5 rounded-xl text-left border transition cursor-pointer ${
                        isActive
                          ? 'bg-[#5C1420] text-[#FAF6EE] border-[#C59B38] shadow-lg'
                          : 'bg-[#F3EBD8]/75 text-[#3E0D16] border-[#C59B38]/35 hover:border-[#5C1420]/60'
                      }`}
                    >
                      <Layers className={`w-4 h-4 mb-2 ${isActive ? 'text-[#DFBD69]' : 'text-[#8C6239]'}`} />
                      <div className="font-cinzel text-xs sm:text-[13px] font-semibold leading-snug">
                        {arch.name.replace(' Architecture', '')}
                      </div>
                      <div className={`text-[10px] mt-1 ${isActive ? 'text-[#DFBD69]/85' : 'text-[#5C493F]'}`}>
                        {arch.period}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Tradition Showcase Panel */}
              <div className="bg-[#F3EBD8] border border-[#C59B38]/45 rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[360px]">
                  <HeritageImage
                    src={activeArchitecture.image}
                    alt={activeArchitecture.name}
                    title={activeArchitecture.name}
                    subtitle={activeArchitecture.period}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#231510]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-[#FAF6EE]">
                    <span className="text-xs uppercase tracking-widest text-[#DFBD69] block">
                      {activeArchitecture.period}
                    </span>
                    <div className="font-cinzel text-2xl font-bold mt-0.5">{activeArchitecture.name}</div>
                    <div className="text-xs text-[#FAF6EE]/80 mt-1">{activeArchitecture.region}</div>
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-9 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <p className="font-cormorant text-xl sm:text-2xl text-[#5C1420] italic leading-relaxed">
                      {activeArchitecture.summary}
                    </p>
                    <p className="text-sm sm:text-base text-[#3C2B23] leading-relaxed">
                      {activeArchitecture.engineering}
                    </p>

                    <div className="pt-2">
                      <div className="text-xs uppercase tracking-[0.18em] text-[#8C6239] font-semibold mb-3">
                        Defining Architectural Hallmarks
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {activeArchitecture.hallmarks.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-2 bg-[#FAF6EE] px-3.5 py-2.5 rounded-lg border border-[#C59B38]/30 text-xs sm:text-sm text-[#231510]"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#C59B38] mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Clickable Chips Linking Directly to Featured Monuments */}
                  <div className="pt-4 border-t border-[#C59B38]/30">
                    <span className="text-[11px] uppercase tracking-widest text-[#8C6239] font-semibold block mb-2.5">
                      Featured Monuments in This Tradition
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {activeArchitecture.monumentIds.map((mId) => {
                        const m = MONUMENTS.find((item) => item.id === mId);
                        if (!m) return null;
                        return (
                          <button
                            key={mId}
                            type="button"
                            onClick={() => openMonumentDetail(mId)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5C1420] hover:bg-[#3E0D16] text-[#FAF6EE] text-xs font-medium transition shadow-sm cursor-pointer"
                          >
                            <Landmark className="w-3.5 h-3.5 text-[#DFBD69]" />
                            <span>{m.name}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#DFBD69]" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              6. SCULPTURE GALLERY ("Stories Carved in Stone")
             ================================================================ */}
          <section id="sculptures" className="py-20 sm:py-28 bg-[#EAE0CC]/65 border-t border-[#C59B38]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs uppercase tracking-[0.24em] text-[#8C6239] font-semibold">
                  Iconography & Master Stonecraft
                </span>
                <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#3E0D16] mt-2">
                  Stories Carved in Stone
                </h2>
                <LotusDivider />
                <p className="text-[#5C493F] text-sm sm:text-base">
                  From Belur’s filigree Madanikas and Ellora’s volcanic basalt epics to Hampi’s resonant granite
                  pillars—click any exhibit to open the full-screen curatorial lightbox.
                </p>
              </div>

              {/* Responsive Masonry-Style Gallery */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {SCULPTURES.map((sculp, idx) => (
                  <button
                    key={sculp.id}
                    type="button"
                    onClick={() => openLightbox(SCULPTURES, idx)}
                    className="break-inside-avoid group relative w-full text-left rounded-2xl overflow-hidden bg-[#2B0B10] border border-[#C59B38]/40 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer block"
                  >
                    <div className={`relative overflow-hidden ${sculp.aspect === 'tall' ? 'h-80 sm:h-96' : 'h-60 sm:h-68'}`}>
                      <HeritageImage
                        src={sculp.image}
                        alt={sculp.title}
                        title={sculp.title}
                        subtitle={sculp.monument}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C0509] via-[#1C0509]/25 to-transparent opacity-90 group-hover:opacity-95 transition" />

                      <span className="absolute top-3.5 right-3.5 p-2 rounded-full bg-[#1C0509]/70 backdrop-blur-sm border border-[#DFBD69]/40 text-[#DFBD69] opacity-0 group-hover:opacity-100 transition">
                        <ZoomIn className="w-4 h-4" />
                      </span>

                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#DFBD69] block mb-1">
                          {sculp.monument}
                        </span>
                        <h3 className="font-cinzel text-lg font-semibold text-[#FAF6EE] leading-snug">
                          {sculp.title}
                        </h3>
                        <p className="text-xs text-[#FAF6EE]/75 mt-1.5 line-clamp-2 leading-relaxed">
                          {sculp.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ================================================================
              7. SCIENCE & INNOVATION (INTERACTIVE MUSEUM STEM LAB)
             ================================================================ */}
          <section
            id="science"
            className="relative py-20 sm:py-28 bg-gradient-to-b from-[#2B0B10] via-[#3A0C15] to-[#24080D] text-[#FAF6EE] overflow-hidden border-y border-[#C59B38]/45"
          >
            <MandalaWatermark className="absolute -top-24 -right-24 w-[520px] h-[520px]" color="#DFBD69" opacity={0.06} />
            <MandalaWatermark className="absolute -bottom-32 -left-32 w-[460px] h-[460px]" color="#DFBD69" opacity={0.05} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs uppercase tracking-[0.24em] text-[#DFBD69] font-semibold">
                  Interactive Indian Knowledge System Lab
                </span>
                <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#FAF6EE] mt-2">
                  Science & Innovation in Stone
                </h2>
                <LotusDivider light />
                <p className="text-[#FAF6EE]/80 text-sm sm:text-base">
                  Experience ancient Indian astronomy, optics, and stone acoustics firsthand through interactive
                  museum simulations.
                </p>
              </div>

              {/* 4 Interactive Lab Selector Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                {[
                  {
                    id: 'samrat',
                    title: 'Samrat Yantra',
                    subtitle: 'Solar Timekeeping (2s)',
                    icon: Sun
                  },
                  {
                    id: 'celestial',
                    title: 'Jai Prakash & Ram Yantra',
                    subtitle: 'Celestial Coordinates',
                    icon: Compass
                  },
                  {
                    id: 'pinhole',
                    title: 'Pinhole Camera Effect',
                    subtitle: 'Virupaksha Temple Optics',
                    icon: Eye
                  },
                  {
                    id: 'musical',
                    title: 'Musical Pillars',
                    subtitle: 'Playable Hampi Acoustics',
                    icon: Music
                  }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeStemTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveStemTab(tab.id)}
                      className={`p-4 rounded-xl border text-left transition flex items-center gap-3.5 cursor-pointer ${
                        isActive
                          ? 'bg-[#C59B38] text-[#231510] border-[#FFF3C4] shadow-[0_0_25px_rgba(197,155,56,0.3)]'
                          : 'bg-[#1D060A]/70 text-[#FAF6EE] border-[#C59B38]/35 hover:border-[#DFBD69]'
                      }`}
                    >
                      <div
                        className={`p-2.5 rounded-lg ${
                          isActive ? 'bg-[#231510]/15 text-[#231510]' : 'bg-[#3E0D16] text-[#DFBD69]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-cinzel text-sm font-bold leading-tight">{tab.title}</div>
                        <div className={`text-xs mt-0.5 ${isActive ? 'text-[#231510]/80' : 'text-[#DFBD69]/80'}`}>
                          {tab.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Interactive Widget Stage */}
              <div className="bg-[#24080D]/90 border border-[#C59B38]/35 rounded-2xl p-5 sm:p-8 shadow-2xl">
                {activeStemTab === 'samrat' && <SamratYantraLab />}
                {activeStemTab === 'celestial' && <CelestialYantraLab />}
                {activeStemTab === 'pinhole' && <PinholeCameraLab />}
                {activeStemTab === 'musical' && <MusicalPillarsLab />}
              </div>
            </div>
          </section>

          {/* ================================================================
              8. INTERACTIVE HERITAGE MAP OF INDIA
             ================================================================ */}
          <section id="map" className="py-20 sm:py-28 bg-[#FAF6EE] parchment-texture">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs uppercase tracking-[0.24em] text-[#8C6239] font-semibold">
                  Geographic Journey Across Bharata
                </span>
                <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#3E0D16] mt-2">
                  Interactive Heritage Map
                </h2>
                <LotusDivider />
                <p className="text-[#5C493F] text-sm sm:text-base">
                  Click any numbered marker on the cartographic map to inspect the monument’s location, architectural
                  era, and jump directly into its exhibition page.
                </p>
              </div>

              <InteractiveHeritageMap onSelectMonument={openMonumentDetail} />
            </div>
          </section>

          {/* ================================================================
              9. OUR PROJECT TEAM ("The Minds Behind Indian Marvels")
             ================================================================ */}
          <section id="team" className="py-20 sm:py-28 bg-[#F3EBD8] border-t border-[#C59B38]/35">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs uppercase tracking-[0.24em] text-[#8C6239] font-semibold flex items-center justify-center gap-2">
                  <Users className="w-4 h-4 text-[#C59B38]" />
                  <span>Academic Project Curators</span>
                </span>
                <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#3E0D16] mt-2">
                  The Minds Behind Indian Marvels
                </h2>
                <LotusDivider />
              </div>

              {/* Four Student Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {TEAM_MEMBERS.map((member) => (
                  <div
                    key={member.rollNo}
                    className="bg-[#FAF6EE] border border-[#C59B38]/45 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5C1420] via-[#C59B38] to-[#5C1420]" />
                    {/* Gold Monogram Seal */}
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#5C1420] to-[#2B0B10] border-2 border-[#C59B38] flex items-center justify-center shadow-md mb-4">
                      <span className="font-cinzel text-2xl font-bold text-[#DFBD69] tracking-wider">
                        {member.initials}
                      </span>
                    </div>
                    <h3 className="font-cinzel text-lg font-bold text-[#3E0D16]">{member.name}</h3>
                    <div className="mt-1.5 inline-block px-3 py-0.5 rounded-full bg-[#F3EBD8] border border-[#C59B38]/40 text-xs font-mono text-[#5C1420] font-semibold">
                      Roll No. {member.rollNo}
                    </div>
                    <p className="text-xs text-[#5C493F] mt-3 leading-relaxed">{member.role}</p>
                  </div>
                ))}
              </div>

              {/* Faculty Guide & Institution Banner */}
              <div className="bg-gradient-to-r from-[#3E0D16] via-[#5C1420] to-[#3E0D16] text-[#FAF6EE] rounded-2xl p-7 sm:p-9 border border-[#C59B38]/55 shadow-xl relative overflow-hidden">
                <MandalaWatermark className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64" color="#DFBD69" opacity={0.1} />
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#DFBD69]/15 border border-[#DFBD69]/60 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-7 h-7 text-[#DFBD69]" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#DFBD69] block">
                        Faculty Guide
                      </span>
                      <div className="font-cinzel text-xl font-bold mt-0.5">Prof. Surendra Rathod</div>
                    </div>
                  </div>

                  <div className="md:border-x border-[#DFBD69]/25 md:px-6">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#DFBD69] block">
                      Institution
                    </span>
                    <div className="font-cinzel text-lg font-semibold mt-0.5">
                      Walchand College of Engineering, Sangli
                    </div>
                  </div>

                  <div className="md:text-right">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#DFBD69] block">
                      Course & Academic Year
                    </span>
                    <div className="font-cinzel text-lg font-semibold mt-0.5">
                      Indian Knowledge System (IKS)
                    </div>
                    <div className="text-sm text-[#DFBD69] font-medium">Academic Year 2026–27</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              10. REFERENCES & ACKNOWLEDGEMENT
             ================================================================ */}
          <section id="references" className="py-20 sm:py-28 bg-[#FAF6EE] border-t border-[#C59B38]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs uppercase tracking-[0.24em] text-[#8C6239] font-semibold">
                  Scholarly Colophon & Gratitude
                </span>
                <h2 className="font-cinzel text-3xl sm:text-4xl text-[#3E0D16] mt-2">
                  References & Acknowledgement
                </h2>
                <LotusDivider />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Archival References */}
                <div className="lg:col-span-7 bg-[#F3EBD8]/70 border border-[#C59B38]/40 rounded-2xl p-7 sm:p-8">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C6239] font-semibold mb-4">
                    <BookOpen className="w-4 h-4 text-[#C59B38]" />
                    <span>References & Archival Sources</span>
                  </div>
                  <div className="space-y-4">
                    {REFERENCES.map((ref, idx) => (
                      <div
                        key={idx}
                        className="bg-[#FAF6EE] border border-[#C59B38]/30 rounded-xl p-4"
                      >
                        <div className="font-cinzel text-sm font-bold text-[#3E0D16]">
                          {idx + 1}. {ref.title}
                        </div>
                        <div className="text-xs text-[#8C6239] font-medium mt-1">{ref.institution}</div>
                        <p className="text-xs text-[#5C493F] mt-1.5 leading-relaxed">{ref.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Formal Acknowledgement */}
                <div className="lg:col-span-5 bg-gradient-to-b from-[#FAF6EE] to-[#F3EBD8] border border-[#C59B38]/45 rounded-2xl p-7 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C6239] font-semibold mb-4">
                      <Award className="w-4 h-4 text-[#C59B38]" />
                      <span>Acknowledgement</span>
                    </div>
                    <h3 className="font-cinzel text-2xl text-[#3E0D16] mb-4">With Sincere Gratitude</h3>
                    <div className="space-y-4 text-sm text-[#3C2B23] leading-relaxed">
                      <p>
                        We express our deepest gratitude to our respected faculty guide,{' '}
                        <strong className="text-[#5C1420]">Prof. Surendra Rathod</strong>, for his invaluable
                        mentorship, thoughtful insights, and continuous encouragement throughout the conceptualization
                        and development of <em>Indian Marvels</em>.
                      </p>
                      <p>
                        We extend our heartfelt thanks to{' '}
                        <strong className="text-[#5C1420]">Walchand College of Engineering, Sangli</strong> for
                        providing an inspiring academic environment and integrating the{' '}
                        <strong>Indian Knowledge System (IKS)</strong> curriculum, which empowered us to study India’s
                        scientific, architectural, and artistic heritage with modern rigor.
                      </p>
                      <p>
                        Finally, we are deeply grateful to our families and friends for their unwavering support,
                        constructive feedback, and enthusiasm at every stage of this project.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#C59B38]/35 text-xs text-[#8C6239] font-cormorant italic text-base">
                    — Project Team, Indian Marvels (Academic Year 2026–27)
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ====================================================================
          11. ROYAL MAROON FOOTER
         ==================================================================== */}
      <footer className="bg-[#2B080F] text-[#FAF6EE] border-t-2 border-[#C59B38]/60 relative overflow-hidden">
        <MandalaWatermark className="absolute -bottom-40 right-0 w-96 h-96" color="#DFBD69" opacity={0.05} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#C59B38]/25">
            {/* Brand & Description */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <TempleEmblem className="w-10 h-10" />
                <div>
                  <div className="font-cinzel text-xl font-bold tracking-[0.16em] text-[#FAF6EE]">
                    INDIAN MARVELS
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#DFBD69]">
                    Interactive Indian Heritage Museum
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#FAF6EE]/75 leading-relaxed max-w-md">
                An Indian Knowledge System (IKS) digital exhibition celebrating India’s timeless brilliance in temple
                architecture, stone sculpture, observational astronomy, acoustics, and structural engineering.
              </p>
            </div>

            {/* Quick Navigation */}
            <div className="md:col-span-4">
              <h4 className="font-cinzel text-sm font-semibold uppercase tracking-[0.18em] text-[#DFBD69] mb-4">
                Quick Exploration
              </h4>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => navigateToSection(link.id)}
                    className="text-left text-[#FAF6EE]/75 hover:text-[#DFBD69] transition cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Institution Credit */}
            <div className="md:col-span-3 space-y-2.5">
              <h4 className="font-cinzel text-sm font-semibold uppercase tracking-[0.18em] text-[#DFBD69] mb-4">
                Presented By
              </h4>
              <p className="text-sm font-medium text-[#FAF6EE]">
                Walchand College of Engineering, Sangli
              </p>
              <p className="text-xs text-[#FAF6EE]/70">
                Indian Knowledge System (IKS) Course Project
              </p>
              <p className="text-xs text-[#DFBD69] font-medium">Academic Year 2026–27</p>
              <p className="text-xs text-[#FAF6EE]/70">Guide: Prof. Surendra Rathod</p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="font-cormorant italic text-xl text-[#DFBD69]">
              “Exploring Our Heritage, Inspiring Our Future.”
            </p>
            <p className="text-xs text-[#FAF6EE]/60">
              INDIAN MARVELS • Walchand College of Engineering, Sangli • 2026–27
            </p>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          FULL-SCREEN MUSEUM LIGHTBOX OVERLAY
         ==================================================================== */}
      {lightboxState.open && (
        <MuseumLightbox
          items={lightboxState.items}
          currentIndex={lightboxState.index}
          onClose={() => setLightboxState((s) => ({ ...s, open: false }))}
          onNavigate={(newIndex) => setLightboxState((s) => ({ ...s, index: newIndex }))}
          onExploreMonument={openMonumentDetail}
        />
      )}
    </div>
  );
}
