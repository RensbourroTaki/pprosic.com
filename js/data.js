// Inhalte der Seite — hier Projekte, Titel und Reihenfolge bearbeiten.
// Bilder liegen in assets/img/
// Hero-Videos liegen in assets/vids/ als 01.mp4, 02.mp4, 03.mp4 … (lückenlos durchnummeriert).
// Neue Videos einfach mit der nächsten freien Nummer dazulegen — kein Code nötig.

window.SITE = {
  // Web3Forms Access Key — Nachrichten gehen an antigollo@hotmail.com
  formKey: '18bb2f64-12c3-484a-9226-a5964d95d8e0',

  // Überblendung zwischen den Hero-Videos in Sekunden
  heroFade: 0.4,

  categories: {
    scifi: 'Sci-Fi',
    interior: 'Interiors',
    viz: 'Visualization',
    brand: 'Brand & Print'
  },

  // [Dateiname, Titel, Kategorie]
  works: [
    ['BT_highway_FINAL.jpg', 'Neon Highway', 'scifi'],
    ['Fetzo_Tankstelle_3K.jpg', 'Charging Park', 'viz'],
    ['TheLibrary_03.jpg', 'The Library', 'interior'],
    ['SheV2.jpg', 'Idle', 'scifi'],
    ['PolizeiEtank.jpg', 'Polizei E-Charger', 'viz'],
    ['BT_BikeHighway_002_0004.jpg', 'Bike Highway', 'scifi'],
    ['Library_cine_www.jpg', 'The Library — Hall', 'interior'],
    ['Elevator_.jpg', 'Elevator', 'scifi'],
    ['Fetzo_Tankstelle2_3K.jpg', 'Airport Charging', 'viz'],
    ['Scene_25_1www.jpg', 'The Library — Gallery', 'interior'],
    ['AfterWorkPNG2.jpg', 'After Work', 'scifi'],
    ['Collage.jpg', 'Energy Systems', 'viz'],
    ['D5_Scene.jpg', 'Taxi', 'scifi'],
    ['TheLibrary_02.jpg', 'The Library — Balcony', 'interior'],
    ['CLEAN2.jpg', 'Crowd', 'scifi'],
    ['Scene_16_1www.jpg', 'The Library — Lobby', 'interior'],
    ['AtHome.jpg', 'At Home', 'scifi'],
    ['TheLibrary_01.jpg', 'The Library — Foyer', 'interior'],
    ['RainScene.jpg', 'Rain', 'scifi'],
    ['Apartment_reduced.jpg', 'Apartment', 'interior'],
    ['Streets4.jpg', 'Streets', 'scifi'],
    ['Balint_www.jpg', 'Bálint Schuhmanufaktur', 'brand'],
    ['WWW_colage.jpg', 'Mode im Stöckl', 'brand'],
    ['MAX.jpg', 'MAXX Mascot', 'brand'],
    ['Skiworld-Pro_Folder1.jpg', 'Skiworld-Pro Folder', 'brand'],
    ['Skiworld-Pro_Folder2.jpg', 'Skiworld-Pro Folder — Inside', 'brand']
  ],

  verbs: 'modeling rigging painting weighting unwrapping texturing animating lighting staging grading shading baking framing rendering pixeling directing cleaning revising polishing composing arranging engineering prototyping testing planning structuring learning',

  tools: [
    { group: '3D & Realtime', items: ['3ds max', 'Unity3D', 'D5-Render', 'Marmoset Toolbag', 'Cascadeur', 'Blender', 'Plasticity', 'Embergen', 'Architectural Coding (claude.ai)'] },
    { group: 'Texturing & 2D', items: ['Substance Painter', 'Mari', 'Spine', 'PS', 'PromotionNG'] },
    { group: 'Layout & Video', items: ['Premiere', 'InDesign', 'Illustrator'] },
    { group: 'Audio', items: ['Studio One', 'VSTs'] }
  ]
};
