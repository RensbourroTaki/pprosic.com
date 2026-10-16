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
    scifi: 'Fictional',
    interior: 'Interiors',
    viz: 'Visualization',
    brand: 'Brand & Print'
  },

  // [Dateiname, Titel, Kategorie]
  works: [
    ['BT_highway_FINAL.jpg', 'Film Project: Highway Scene', 'scifi'],
    ['Fetzo_Tankstelle_3K.jpg', 'Electric Charging Solution Project', 'viz'],
    ['SheV2.jpg', 'Film Project: Idle Scene', 'scifi'],
    ['PolizeiEtank.jpg', 'Electric Charging Solution and Branding', 'viz'],
    ['BT_BikeHighway_002_0004.jpg', 'Film Project: Chase Scene', 'scifi'],
    ['Library_cine_www.jpg', 'Library Project: Hall', 'interior'],
    ['Elevator_.jpg', 'Film Project: Elevator Scene', 'scifi'],
    ['Fetzo_Tankstelle2_3K.jpg', 'Slim Electric Charging Installation', 'viz'],
    ['Scene_25_1www.jpg', 'Library Project: Inverted Balustrade', 'interior'],
    ['AfterWorkPNG2.jpg', 'Film Project: After Work Scene', 'scifi'],
    ['Collage.jpg', 'Electric Charging Project: Customized Charging & Storage Concepts', 'viz'],
    ['D5_Scene.jpg', 'Custom Vehicle for Film Project', 'scifi'],
    ['TheLibrary_02.jpg', 'Library Project: Statues', 'interior'],
    ['CLEAN2.jpg', 'Film Project: First Encounter', 'scifi'],
    ['AtHome.jpg', 'Film Project: At Home / Window Scene', 'scifi'],
    ['TheLibrary_01.jpg', 'Library Project: Lower Level - Corner Along Entrance View', 'interior'],
    ['RainScene.jpg', 'Film Project: Crime Scene', 'scifi'],
    ['Apartment_reduced.jpg', 'Film Project: Customized Apartment Design', 'interior'],
    ['Streets4.jpg', 'Film Project: Private Concept', 'scifi'],
    ['Balint_www.jpg', 'Family Crest Redesign According to the Golden Ratio', 'brand'],
    ['MAX.jpg', 'CI and Mascot Design', 'brand'],
    ['Skiworld-Pro_Folder1.jpg', 'Folder Design - Out: Front/Inner', 'brand'],
    ['Skiworld-Pro_Folder2.jpg', 'Folder Design - Inside', 'brand']
  ],

  verbs: 'modeling rigging painting weighting unwrapping texturing animating lighting staging grading shading baking framing rendering pixeling directing cleaning revising polishing composing arranging engineering prototyping testing planning structuring learning',

  tools: [
    { group: '3D & Realtime', items: ['3ds max', 'Unity3D', 'D5-Render', 'Marmoset Toolbag', 'Cascadeur', 'Blender', 'Plasticity', 'Embergen', 'Architectural Coding (claude.ai)'] },
    { group: 'Texturing & 2D', items: ['Substance Painter', 'Mari', 'Spine', 'PS', 'PromotionNG'] },
    { group: 'Layout & Video', items: ['Premiere', 'InDesign', 'Illustrator'] },
    { group: 'Audio', items: ['Studio One', 'VSTs'] }
  ]
};
