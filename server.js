// const express=require('express');
// const fetch=require('node-fetch');
// const btoa=require('btoa');

// const cors = require('cors');
// app.use(cors());


// const app = express();
// const port = 3000;

// // Declaring client id and secret
// const clientId = '530e8bc51fca4e27b185c54e326b68b6';
// const clientSecret = '443c6024c05c4ca7b7640631b412d6c4';

// // Function to get access token
// async function getAccessToken() {
//     // Dynamically import node-fetch
//     const fetch = (await import('node-fetch')).default;
//     const response = await fetch('https://accounts.spotify.com/api/token', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
//         },
//         body: 'grant_type=client_credentials'
//     });

//     const final_token = await response.json();
//     return final_token.access_token;
// }

// // Function to search album for the Spotify API
// async function Search_album(albumName) {
//     const token_access = await getAccessToken();
//     const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(albumName)}&type=album`, {
//         method: 'GET',
//         headers: {
//             'Authorization': 'Bearer ' + token_access
//         }
//     });
//     const data = await response.json();
//     return data.albums.items[0];
// }

// // Function to display the album information
// app.get('/album-info-set', async (req, res) => {
//     const { albumName, Description } = req.query;
//     const album = await Search_album(albumName);
//     if (album) {
//         const album_image = album.images[0].url;
//         const album_info = {
//             image: album_image,
//             name: album.name,
//             description: Description,
//             artist: album.artists[0].name,
//             release_date: album.release_date
//         };
//         res.json(album_info);
//     } else {
//         res.status(404).json({ message: "Album not found" });
//     }
// });

// // Function to set the album image
// app.get('/album-info-display', async (req, res) => {
//     const { albumName } = req.query;
//     const album = await Search_album(albumName);
//     if (album) {
//         const album_image = album.images[0].url;
//         res.json({ image: album_image });
//     } else {
//         res.status(404).json({ message: "Album not found" });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
