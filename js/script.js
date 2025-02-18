document.addEventListener('DOMContentLoaded', function() {
    fetch('lyrics/sample_lyrics.json')
        .then(response => response.json())
        .then(data => {
            const sortedData = data.sort((a, b) => a.title.localeCompare(b.title, 'te'));

            const lyricsList = document.getElementById('lyrics-list');
            sortedData.forEach((song, index) => {
                const songDiv = document.createElement('div');
                songDiv.className = 'song';
                
                // Create song number
                const songNumber = document.createElement('span');
                songNumber.className = 'song-number';
                songNumber.textContent = `${index + 1}. `;
                
                // Create link for song
                const songLink = document.createElement('a');
                songLink.textContent = song.title;
                songLink.href = `song.html?id=${encodeURIComponent(song.title)}`;
                songLink.target = '_blank';
                songLink.className = 'song-title';
                
                songDiv.appendChild(songNumber);
                songDiv.appendChild(songLink);
                lyricsList.appendChild(songDiv);

            });
        })
        .catch(error => {
            console.error('Error loading lyrics:', error);
            const lyricsList = document.getElementById('lyrics-list');
            lyricsList.innerHTML = '<p>Error loading song lyrics. Please try again later.</p>';
        });
});
