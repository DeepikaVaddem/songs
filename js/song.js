document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const songId = urlParams.get('id');
    
    if (!songId) {
        window.location.href = 'index.html';
        return;
    }
    
    fetch('lyrics/sample_lyrics.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Lyrics data loaded:', data);

            const song = data.find(s => s.title === decodeURIComponent(songId));
            if (song) {
                document.getElementById('song-title').textContent = song.title;
                const lyricsContainer = document.getElementById('lyrics-container');
                lyricsContainer.innerHTML = ''; // Clear previous content
                
                // Split lyrics by newlines and create paragraph for each line
                const lines = song.lyrics.split('\n');
                lines.forEach(line => {
                    const p = document.createElement('p');
                    p.className = 'lyric-line';
                    p.textContent = line;
                    lyricsContainer.appendChild(p);
                });
            } else {
                document.getElementById('song-container').innerHTML = '<p>Song not found.</p>';
            }

        })
        .catch(error => {
            console.error('Error loading lyrics:', error);
            document.getElementById('song-container').innerHTML = `
                <p>Error loading song lyrics. Please try again later.</p>
                <p>Error details: ${error.message}</p>
            `;
        });

});
