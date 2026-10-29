/**
 * ==============================================================================
 * COOL-CV INTERACTIVE LEAFLET JOURNEY MAP
 * ==============================================================================
 * Purpose: Renders the custom monochrome map of Europe, drawing trajectory lines
 *          connecting Seville -> Bonn -> Marseille -> Pamplona -> Barcelona.
 * ==============================================================================
 */

    // ---------------------------------------------------------
    // LEAFLET MAP (High-Contrast B&W Monochrome)
    // ---------------------------------------------------------
    const citiesData = [
      {
        key: 'bonn',
        name: 'Bonn / Cologne (Germany)',
        coords: [50.7374, 7.0982],
        org: 'Fraunhofer FHR',
        role: 'Research Scientist · Cognitive Radar Optimization',
        period: '2018–2019'
      },
      {
        key: 'marseille',
        name: 'Marseille (France)',
        coords: [43.2965, 5.3698],
        org: 'Aix-Marseille University',
        role: 'MSc Plasma & Fusion Physics (1st of Class)',
        period: '2019–2020'
      },
      {
        key: 'seville',
        name: 'Seville (Spain)',
        coords: [37.3891, -5.9845],
        org: 'University of Seville',
        role: 'Double Degree (Physics & Mathematics, 3rd) · Plasma Researcher',
        period: '2013–2018 · 2020–2022'
      },
      {
        key: 'pamplona',
        name: 'Pamplona (Spain)',
        coords: [42.8125, -1.6458],
        org: 'CENER (Renewable Energy)',
        role: 'Data Scientist · Wind Turbine ML & Predictive Maintenance',
        period: '2022'
      },
      {
        key: 'barcelona',
        name: 'Barcelona (Spain)',
        coords: [41.3879, 2.1699],
        org: 'Barcelona Supercomputing Center (BSC)',
        role: 'HPC Scientific Software Engineer (Performance & Fusion)',
        period: '2023–Present'
      }
    ];

    const routeLegs = [
      { from: [50.7374, 7.0982], to: [43.2965, 5.3698], curveOffset: -1.0, label: 'Leg 1: Bonn → Marseille' },
      { from: [43.2965, 5.3698], to: [37.3891, -5.9845], curveOffset: -1.8, label: 'Leg 2: Marseille → Seville' },
      { from: [37.3891, -5.9845], to: [42.8125, -1.6458], curveOffset: 1.2, label: 'Leg 3: Seville → Pamplona' },
      { from: [42.8125, -1.6458], to: [41.3879, 2.1699], curveOffset: -0.5, label: 'Leg 4: Pamplona → Barcelona (BSC Current ★)' }
    ];

    function generateCurvePoints(start, end, offsetDegree = 2.0, numPoints = 35) {
      const p0 = start;
      const p2 = end;
      const midLat = (p0[0] + p2[0]) / 2;
      const midLng = (p0[1] + p2[1]) / 2;
      const dLat = p2[0] - p0[0];
      const dLng = p2[1] - p0[1];
      const ctrlLat = midLat - dLng * 0.18 * offsetDegree;
      const ctrlLng = midLng + dLat * 0.18 * offsetDegree;

      const points = [];
      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const lat = (1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * ctrlLat + t * t * p2[0];
        const lng = (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * ctrlLng + t * t * p2[1];
        points.push([lat, lng]);
      }
      return points;
    }

    let map;
    const markers = {};
    let mapInitialized = false;

    function initMap() {
      if (mapInitialized) {
        map.invalidateSize();
        return;
      }

      map = L.map('europe-leaflet-map', {
        attributionControl: false,
        center: [45.0, 3.5],
        zoom: 4,
        minZoom: 3,
        maxZoom: 10,
        scrollWheelZoom: false
      });

      // Esri Light Gray base layer, styled via CSS to pure monochrome
      L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
      }).addTo(map);

      // High-Precision Real Geographic Country Masks (All cities accurately encompassed)
      const countryHighlights = [
        {
          name: "Spain · España",
          color: "#FEB737", // Honey Amber
          coords: [
            [41.8806, -9.0348], [42.5928, -8.9844], [43.0266, -9.3929], [43.7483, -7.9782], [43.5679, -6.7545],
            [43.5742, -5.4119], [43.4034, -4.3478], [43.4559, -3.5175], [43.4228, -1.9014], [43.0340, -1.5028],
            [42.5795, 0.3380], [42.7957, 0.7016], [42.3434, 1.8268], [42.4730, 2.9860], [41.8921, 3.0395],
            [41.2261, 2.0918], [41.0147, 0.8105], [40.6783, 0.7213], [40.1239, 0.1067], [39.3100, -0.2787],
            [38.7385, 0.1113], [38.2924, -0.4671], [37.6424, -0.6834], [37.4431, -1.4384], [36.6741, -2.1465],
            [36.6589, -3.4158], [36.6778, -4.3689], [36.3247, -4.9952], [35.9468, -5.3772], [36.0298, -5.8664],
            [36.3677, -6.2367], [36.9429, -6.5202], [37.0978, -7.4537], [37.4289, -7.5371], [37.8039, -7.1665],
            [38.0758, -7.0293], [38.3731, -7.3741], [39.0301, -7.0980], [39.6296, -7.4986], [39.7119, -7.0666],
            [40.1845, -7.0264], [40.3309, -6.8640], [41.1111, -6.8511], [41.3818, -6.3891], [41.8834, -6.6686],
            [41.9183, -7.2513], [41.7921, -7.4225], [41.7909, -8.0132], [42.2805, -8.2639], [42.1347, -8.6719],
            [41.8806, -9.0348]
          ],
          tooltip: "<strong>Spain (España)</strong><br>Seville (BSc Double Degree) · Barcelona (BSC-CNS)"
        },
        {
          name: "France",
          color: "#7BB8C0", // Sea Breeze
          coords: [
            [50.3790, 3.5882], [49.9075, 4.2860], [49.9854, 4.7992], [49.5295, 5.6741], [49.4427, 5.8978],
            [49.4638, 6.1863], [49.2020, 6.6582], [49.0178, 8.0993], [48.3330, 7.5937], [47.6206, 7.4668],
            [47.4498, 7.1922], [47.5418, 6.7366], [47.2877, 6.7687], [46.7258, 6.0374], [46.2730, 6.0226],
            [46.4297, 6.5001], [45.9911, 6.8436], [45.7086, 6.8024], [45.3331, 7.0967], [45.0285, 6.7500],
            [44.2548, 7.0076], [44.1279, 7.5496], [43.6938, 7.4352], [43.1289, 6.5292], [43.3997, 4.5570],
            [43.0752, 3.1004], [42.4730, 2.9860], [42.3434, 1.8268], [42.7957, 0.7016], [42.5795, 0.3380],
            [43.0340, -1.5028], [43.4228, -1.9014], [44.0226, -1.3842], [46.0149, -1.1938], [47.0644, -2.2257],
            [47.5703, -2.9633], [47.9550, -4.4916], [48.6842, -4.5924], [48.9017, -3.2958], [48.6444, -1.6165],
            [49.7763, -1.9335], [49.3474, -0.9895], [50.1272, 1.3388], [50.9466, 1.6390], [51.1485, 2.5136],
            [50.7968, 2.6584], [50.7804, 3.1233], [50.3790, 3.5882]
          ],
          tooltip: "<strong>France</strong><br>Marseille (MSc Plasma & Fusion Physics, 1st of Class)"
        },
        {
          name: "Germany · Deutschland",
          color: "#543786", // Deep Indigo
          coords: [
            [54.9831, 9.9219], [54.5966, 9.9396], [54.3636, 10.9501], [54.0087, 10.9395], [54.1965, 11.9563],
            [54.4704, 12.5184], [54.0755, 13.6475], [53.7570, 14.1197], [53.2482, 14.3533], [52.9813, 14.0745],
            [52.6248, 14.4376], [52.0899, 14.6850], [51.7452, 14.6071], [51.1067, 15.0170], [51.0023, 14.5707],
            [51.1173, 14.3070], [50.9269, 14.0562], [50.7332, 13.3381], [50.4841, 12.9668], [50.2663, 12.2401],
            [49.9691, 12.4152], [49.5474, 12.5210], [49.3071, 13.0313], [48.8772, 13.5959], [48.4161, 13.2434],
            [48.2891, 12.8841], [47.6376, 13.0259], [47.4676, 12.9326], [47.6724, 12.6208], [47.7031, 12.1414],
            [47.5238, 11.4264], [47.5664, 10.5445], [47.3025, 10.4021], [47.5802, 9.8961], [47.5251, 9.5942],
            [47.8308, 8.5226], [47.6136, 8.3173], [47.6206, 7.4668], [48.3330, 7.5937], [49.0178, 8.0993],
            [49.2020, 6.6582], [49.4638, 6.1863], [49.9022, 6.2428], [50.1281, 6.0431], [50.8037, 6.1567],
            [51.8516, 5.9887], [51.8520, 6.5894], [52.2284, 6.8429], [53.1440, 7.0921], [53.4822, 6.9051],
            [53.6939, 7.1004], [53.7483, 7.9362], [53.5278, 8.1217], [54.0208, 8.8007], [54.3956, 8.5721],
            [54.9627, 8.5262], [54.8309, 9.2820], [54.9831, 9.9219]
          ],
          tooltip: "<strong>Germany (Deutschland)</strong><br>Bonn & Cologne (Fraunhofer FHR Cognitive Radar)"
        }
      ];

      countryHighlights.forEach(c => {
        L.polygon(c.coords, {
          color: c.color,
          weight: 2.0,
          opacity: 0.85,
          fillColor: c.color,
          fillOpacity: 0.22,
          className: 'country-highlight-poly'
        }).addTo(map).bindTooltip(c.tooltip, { sticky: true, className: 'country-tooltip' });
      });

      // Trajectory Curved Lines (Dynamic Accent)
      routeLegs.forEach((leg) => {
        const curvePoints = generateCurvePoints(leg.from, leg.to, leg.curveOffset);
        
        // Underline shadow
        L.polyline(curvePoints, {
          className: 'leaflet-route-shadow',
          color: 'rgba(0, 0, 0, 0.45)',
          weight: 4.5,
          opacity: 0.5
        }).addTo(map);

        // Core line
        L.polyline(curvePoints, {
          className: 'leaflet-route-core',
          weight: 2.5,
          opacity: 0.95,
          dashArray: '6, 6'
        }).addTo(map).bindTooltip(leg.label, { sticky: true, className: 'country-tooltip' });
      });

      // City Markers
      citiesData.forEach(city => {
        const markerIcon = L.divIcon({
          className: 'custom-map-marker',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        const marker = L.marker(city.coords, { icon: markerIcon }).addTo(map);
        
        marker.bindPopup(`
          <div style="font-family:var(--font-mono); color:var(--bw-text);">
            <div style="font-size:15px; font-weight:800; margin-bottom:2px; color:var(--bw-text);">${city.name}</div>
            <div style="font-size:12.5px; font-weight:600; color:var(--bw-text-muted);">${city.org}</div>
            <div style="font-family:var(--font-mono); font-size:11.5px; margin-top:4px; font-weight:700; color:var(--bw-border);">${city.role}</div>
            <div style="font-size:11px; color:var(--bw-text-dim); margin-top:2px;">${city.period}</div>
          </div>
        `);

        marker.on('click', () => {
          highlightTimelineCard(city.key, false);
        });

        markers[city.key] = marker;
      });

      resetMapView();
      mapInitialized = true;
    }

    function resetMapView() {
      if (!map) return;
      map.setView([45.0, 3.5], 4);
    }

    function focusCity(cityKey, openPopup = false) {
      const city = citiesData.find(c => c.key === cityKey);
      if (!city || !map) return;

      // Smoothly scroll the modal scroll body to top so the map is fully visible
      const modalTrajectory = document.getElementById('modal-trajectory');
      const scrollBody = modalTrajectory ? modalTrajectory.querySelector('.modal-scroll-body') : null;
      if (scrollBody && scrollBody.scrollTop > 0) {
        scrollBody.scrollTo({ top: 0, behavior: 'smooth' });
      }

      map.flyTo(city.coords, 6.5, {
        animate: true,
        duration: 1.0
      });

      if (openPopup && markers[cityKey]) {
        setTimeout(() => {
          markers[cityKey].openPopup();
        }, 800);
      }
      highlightTimelineCard(cityKey, false);
    }

    function highlightTimelineCard(cityKey, shouldScroll = false) {
      document.querySelectorAll('.timeline-card').forEach(c => c.classList.remove('highlight'));
      const activeCards = document.querySelectorAll(`.timeline-card[data-city="${cityKey}"]`);
      activeCards.forEach(c => c.classList.add('highlight'));
      if (shouldScroll && activeCards.length > 0) {
        activeCards[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

