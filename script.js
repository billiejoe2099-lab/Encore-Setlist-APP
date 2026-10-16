// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const app = {
        bandNameInput: document.getElementById('band-name'),
        saveBandBtn: document.getElementById('save-band'),
        songSearchInput: document.getElementById('song-search'),
        songSuggestions: document.getElementById('song-suggestions'),
        songList: document.getElementById('song-list'),
        addToEventBtn: document.getElementById('add-to-event-btn'),
        addToRehearsalBtn: document.getElementById('add-to-rehearsal-btn'),
        navTabs: document.querySelectorAll('.nav-tab'),
        sections: document.querySelectorAll('.section'),
        eventList: document.getElementById('event-list'),
        rehearsalList: document.getElementById('rehearsal-list'),
        addEventBtn: document.getElementById('add-event'),
        addRehearsalBtn: document.getElementById('add-rehearsal'),
        geminiApiKeyInput: document.getElementById('gemini-api-key'),
        saveSettingsBtn: document.getElementById('save-settings'),
        songPopup: document.getElementById('song-popup'),
        popupClose: document.querySelector('.popup-close'),
        popupContentInner: document.getElementById('popup-content-inner'),
        detailPopup: document.getElementById('detail-popup'),
        detailPopupClose: document.querySelector('.detail-popup-close'),
        detailPopupInner: document.getElementById('detail-popup-inner')
    };

    // State
    let state = {
        bandName: '',
        songs: [], // array of song objects
        events: [], // array of event objects
        rehearsals: [], // array of rehearsal objects
        songNotes: {}, // map songId -> notes
        selectedSongId: null, // for adding to event/rehearsal
        geminiApiKey: '',
        // UI states
        activeSection: 'repertory'
    };

    // Initialize from localStorage
    function loadState() {
        const saved = localStorage.getItem('bandRepertorioState');
        if (saved) {
            const parsed = JSON.parse(saved);
            state = { ...state, ...parsed };
        }
        // Also load band name separately for immediate display
        state.bandName = localStorage.getItem('bandName') || '';
        state.geminiApiKey = localStorage.getItem('geminiApiKey') || '';
    }

    function saveState() {
        localStorage.setItem('bandRepertorioState', JSON.stringify(state));
        localStorage.setItem('bandName', state.bandName);
        localStorage.setItem('geminiApiKey', state.geminiApiKey);
    }

    // Render functions
    function render() {
        renderBandName();
        renderNav();
        renderSections();
        if (state.activeSection === 'repertory') renderRepertory();
        else if (state.activeSection === 'events') renderEvents();
        else if (state.activeSection === 'rehearsals') renderRehearsals();
        else if (state.activeSection === 'settings') renderSettings();
    }

    function renderBandName() {
        app.bandNameInput.value = state.bandName || '';
    }

    function renderNav() {
        app.navTabs.forEach(tab => {
            const section = tab.dataset.section;
            if (section === state.activeSection) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }

    function renderSections() {
        app.sections.forEach(section => {
            const sectionId = section.id;
            if (sectionId === state.activeSection) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    function renderRepertory() {
        // Render song list
        if (state.songs.length === 0) {
            app.songList.innerHTML = '<p>No hay canciones en el repertorio. Agrega una cancion arriba.</p>';
        } else {
            app.songList.innerHTML = '';
            state.songs.forEach(song => {
                const card = document.createElement('div');
                card.className = 'song-card';
                card.dataset.songId = song.id;
                card.innerHTML = `
                    <img src="${song.artworkUrl100 || 'https://via.placeholder.com/50?img=no-img'}" alt="${song.trackName}">
                    <div class="song-details">
                        <h3>${song.trackName}</h3>
                        <p>${song.artistName} - ${song.collectionName || ''}</p>
                    </div>
                `;
                card.addEventListener('click', () => openSongPopup(song));
                app.songList.appendChild(card);
            });
        }
        // Update action buttons state
        const hasSelected = state.selectedSongId !== null;
        app.addToEventBtn.disabled = !hasSelected;
        app.addToRehearsalBtn.disabled = !hasSelected;
    }

    function renderEvents() {
        if (state.events.length === 0) {
            app.eventList.innerHTML = '<p>No hay eventos. Agrega un evento arriba.</p>';
        } else {
            app.eventList.innerHTML = '';
            state.events.forEach((event, index) => {
                const card = document.createElement('div');
                card.className = 'event-card';
                card.dataset.eventIndex = index;
                const dateStr = new Date(event.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
                card.innerHTML = `
                    <h3>${event.name}</h3>
                    <p>${dateStr} ${event.time ? 'at ' + event.time : ''}</p>
                    ${event.location ? `<p>${event.location}</p>` : ''}
                `;
                card.addEventListener('click', () => openEventDetail(event));
                app.eventList.appendChild(card);
            });
        }
    }

    function renderRehearsals() {
        if (state.rehearsals.length === 0) {
            app.rehearsalList.innerHTML = '<p>No hay ensayos. Agrega un ensayo arriba.</p>';
        } else {
            app.rehearsalList.innerHTML = '';
            state.rehearsals.forEach((rehearsal, index) => {
                const card = document.createElement('div');
                card.className = 'rehearsal-card';
                card.dataset.rehearsalIndex = index;
                const dateStr = new Date(rehearsal.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
                card.innerHTML = `
                    <h3>${rehearsal.name}</h3>
                    <p>${dateStr} ${rehearsal.time ? 'at ' + rehearsal.time : ''}</p>
                `;
                card.addEventListener('click', () => openRehearsalDetail(rehearsal));
                app.rehearsalList.appendChild(card);
            });
        }
    }

    function renderSettings() {
        app.geminiApiKeyInput.value = state.geminiApiKey || '';
    }

    // Event listeners
    app.saveBandBtn.addEventListener('click', () => {
        state.bandName = app.bandNameInput.value.trim();
        saveState();
        render();
        alert('Nombre de banda guardado');
    });

    app.songSearchInput.addEventListener('input', debounce(handleSongSearch, 300));

    app.addToEventBtn.addEventListener('click', () => {
        if (state.selectedSongId) {
            // For simplicity, we'll just add to the first event or prompt? We'll add to a temporary list.
            // We'll implement adding to selected event later.
            alert('Funcionalidad de agregar a evento pendiente de implementar UI de seleccion de evento');
        }
    });

    app.addToRehearsalBtn.addEventListener('click', () => {
        if (state.selectedSongId) {
            alert('Funcionalidad de agregar a ensayo pendiente de implementar UI de seleccion de ensayo');
        }
    });

    app.navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            state.activeSection = tab.dataset.section;
            render();
        });
    });

    app.addEventBtn.addEventListener('click', () => {
        // Simple prompt for event details
        const name = prompt('Nombre del evento:');
        if (!name) return;
        const date = prompt('Fecha (YYYY-MM-DD):');
        if (!date) return;
        const time = prompt('Hora (opcional, HH:MM):');
        const location = prompt('Ubicacion (opcional):');
        const event = {
            id: Date.now() + Math.random(),
            name,
            date: date + 'T00:00:00', // store as ISO string
            time: time || '',
            location: location || '',
            songs: [] // array of song ids in order
        };
        state.events.push(event);
        saveState();
        render();
    });

    app.addRehearsalBtn.addEventListener('click', () => {
        const name = prompt('Nombre del ensayo:');
        if (!name) return;
        const date = prompt('Fecha (YYYY-MM-DD):');
        if (!date) return;
        const time = prompt('Hora (opcional, HH:MM):');
        const rehearsal = {
            id: Date.now() + Math.random(),
            name,
            date: date + 'T00:00:00',
            time: time || '',
            location: '', // rehearsals might not need location
            songs: [],
            notes: {}
        };
        state.rehearsals.push(rehearsal);
        saveState();
        render();
    });

    app.saveSettingsBtn.addEventListener('click', () => {
        state.geminiApiKey = app.geminiApiKeyInput.value.trim();
        saveState();
        alert('API key guardada');
    });

    app.popupClose.addEventListener('click', () => {
        app.songPopup.style.display = 'none';
    });

    app.detailPopupClose.addEventListener('click', () => {
        app.detailPopup.style.display = 'none';
    });

    // Close popup when clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target === app.songPopup) {
            app.songPopup.style.display = 'none';
        }
        if (e.target === app.detailPopup) {
            app.detailPopup.style.display = 'none';
        }
    });

    // Functions
    function handleSongSearch() {
        const query = app.songSearchInput.value.trim();
        if (query.length < 2) {
            app.songSuggestions.innerHTML = '';
            return;
        }
        // Use iTunes API for search suggestions
        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`)
            .then(response => response.json())
            .then(data => {
                renderSuggestions(data.results);
            })
            .catch(err => {
                console.error('Error searching iTunes:', err);
                app.songSuggestions.innerHTML = '<p>Error al buscar.</p>';
            });
    }

    function renderSuggestions(tracks) {
        app.songSuggestions.innerHTML = '';
        if (tracks.length === 0) {
            app.songSuggestions.innerHTML = '<p>No se encontraron resultados.</p>';
            return;
        }
        tracks.forEach(track => {
            const li = document.createElement('li');
            li.dataset.trackId = track.trackId;
            li.innerHTML = `
                <img src="${track.artworkUrl100}" alt="${track.trackName}">
                <div class="song-info">
                    <h3>${track.trackName}</h3>
                    <p>${track.artistName} - ${track.collectionName}</p>
                </div>
            `;
            li.addEventListener('click', () => {
                selectSongFromItunes(track);
                app.songSuggestions.innerHTML = '';
                app.songSearchInput.value = '';
            });
            app.songSuggestions.appendChild(li);
        });
    }

    function selectSongFromItunes(track) {
        // Create a song object with base info
        const song = {
            id: Date.now() + Math.random(), // temporary ID, will be replaced after Gemini fetch?
            trackId: track.trackId,
            trackName: track.trackName,
            artistName: track.artistName,
            collectionName: track.collectionName,
            artworkUrl100: track.artworkUrl100,
            genre: track.primaryGenreName,
            releaseDate: track.releaseDate,
            // Placeholder for extra details to be filled by Gemini
            key: '',
            bpm: 0,
            tuning: '',
            gear: {} // guitarist -> {amps, drives, modulations, delays}
        };
        // Fetch extra details from Gemini (placeholder)
        fetchGeminiDetails(song).then(details => {
            Object.assign(song, details);
            // Add to state songs
            state.songs.push(song);
            state.selectedSongId = song.id;
            saveState();
            render();
        }).catch(err => {
            console.error('Error fetching Gemini details:', err);
            // Still add song with placeholder details
            state.songs.push(song);
            state.selectedSongId = song.id;
            saveState();
            render();
        });
    }

    // Placeholder for Gemini API call
    function fetchGeminiDetails(song) {
        // In a real app, we would call Gemini API with the song info
        // For now, return mock data after a short delay
        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock data based on song name
                const mockDetails = {
                    key: 'Am',
                    bpm: 120,
                    tuning: 'E Standard',
                    gear: {
                        guitarist1: {
                            amps: ['Marshall JCM800'],
                            drives: ['Ibanez Tube Screamer'],
                            modulations: ['Boss CE-2 Chorus'],
                            delays: ['TC Electronic Flashback']
                        },
                        guitarist2: {
                            amps: ['Fender Twin Reverb'],
                            drives: ['Fulltone OCD'],
                            modulations: ['Electro-Harmonix Small Stone'],
                            delays: ['Strymon Timeline']
                        }
                    }
                };
                resolve(mockDetails);
            }, 500);
        });
    }

    function openSongPopup(song) {
        // Build popup content
        let gearHtml = '';
        if (song.gear) {
            gearHtml = '<h3>Equipo por Guitarrista</h3>';
            for (const [guitarist, equipment] of Object.entries(song.gear)) {
                gearHtml += `<h4>${guitarist}</h4>`;
                for (const [type, items] of Object.entries(equipment)) {
                    if (items.length > 0) {
                        gearHtml += `<p><strong>${type.charAt(0).toUpperCase() + type.slice(1)}:</strong> ${items.join(', ')}</p>`;
                    }
                }
            }
        }
        app.popupContentInner.innerHTML = `
            <div style="text-align:center; margin-bottom:1rem;">
                <img src="${song.artworkUrl100 || 'https://via.placeholder.com/200'}" alt="${song.trackName}" style="width:200px;height:200px;object-fit:cover;border-radius:8px;">
            </div>
            <h2>${song.trackName}</h2>
            <p><strong>Artista:</strong> ${song.artistName}</p>
            <p><strong>Album:</strong> ${song.collectionName}</p>
            <p><strong>Género:</strong> ${song.genre}</p>
            <p><strong>Fecha de lanzamiento:</strong> ${new Date(song.releaseDate).toLocaleDateString()}</p>
            <hr>
            <p><strong>Tonalidad:</strong> ${song.key}</p>
            <p><strong>BPM:</strong> ${song.bpm}</p>
            <p><strong>Afinación:</strong> ${song.tuning}</p>
            ${gearHtml}
            <div id="ensayar-seccion">
                <h3>Ensayar canción</h3>
                <p>Próximamente: videos de tabs, backing tracks, etc.</p>
            </div>
        `;
        app.songPopup.style.display = 'flex';
    }

    function openEventDetail(event) {
        // Build detail popup for event
        const dateStr = new Date(event.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
        let songsHtml = '';
        if (event.songs && event.songs.length > 0) {
            songsHtml = '<h3>Canciones del evento</h3><ul>';
            event.songs.forEach(songId => {
                const song = state.songs.find(s => s.id === songId);
                if (song) {
                    songsHtml += `<li>${song.trackName} - ${song.artistName}</li>`;
                }
            });
            songsHtml += '</ul>';
        } else {
            songsHtml = '<p>No hay canciones asignadas a este evento.</p>';
        }
        app.detailPopupInner.innerHTML = `
            <h2>${event.name}</h2>
            <p><strong>Fecha:</strong> ${dateStr}</p>
            ${event.time ? `<p><strong>Hora:</strong> ${event.time}</p>` : ''}
            ${event.location ? `<p><strong>Ubicación:</strong> ${event.location}</p>` : ''}
            <hr>
            ${songsHtml}
        `;
        app.detailPopup.style.display = 'flex';
    }

    function openRehearsalDetail(rehearsal) {
        const dateStr = new Date(rehearsal.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
        let songsHtml = '';
        if (rehearsal.songs && rehearsal.songs.length > 0) {
            songsHtml = '<h3>Canciones del ensayo</h3><ul>';
            rehearsal.songs.forEach(songId => {
                const song = state.songs.find(s => s.id === songId);
                if (song) {
                    songsHtml += `<li>${song.trackName} - ${song.artistName}</li>`;
                }
            });
            songsHtml += '</ul>';
        } else {
            songsHtml = '<p>No hay canciones asignadas a este ensayo.</p>';
        }
        app.detailPopupInner.innerHTML = `
            <h2>${rehearsal.name}</h2>
            <p><strong>Fecha:</strong> ${dateStr}</p>
            ${rehearsal.time ? `<p><strong>Hora:</strong> ${rehearsal.time}</p>` : ''}
            <hr>
            ${songsHtml}
        `;
        app.detailPopup.style.display = 'flex';
    }

    // Utility: debounce function
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Initialize
    loadState();
    render();
});
