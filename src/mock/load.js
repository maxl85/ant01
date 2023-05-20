const fs = require('fs');
const https = require('https');
const path = require('path');

let data = require('./data.json');




// console.log(data.Search[0].Poster);

// let url = data.Search[1].Poster
// https.get(url, resp => resp.pipe(fs.createWriteStream(`./images/test_1.jpg`)));

// const filename = path.basename(url);
// console.log(filename)


function downloadFile(url) {


  https.get(url, (res) => {
    const filename = path.basename(url);
    const fileStream = fs.createWriteStream(`./images/${filename}`);
    res.pipe(fileStream);

    // after download completed close filestream
    fileStream.on('finish', () => {
      fileStream.close();
      // console.log('Download finished')
    });
  })
}


// try {
//   downloadFile(data.Search[0].Poster)
// } catch (error) {
//   console.log(error)
// }




// data.Search.map(movie => {
//   try {
//     downloadFile(movie.Poster)
//   } catch (error) {
//     console.log(error)
//   }
// });

for (let i = 0; i < data.Search.length; i++) {
  try {
    const movie = data.Search[i];
    // downloadFile(movie.Poster)

    // const filename = path.basename(movie.Poster);
    // data.Search[i].Poster = `./images/${filename}`;
    data.Search[i].Year = parseInt(data.Search[i].Year);
  } catch (error) {
    console.log(error)
  }
}


fs.writeFile('localData.json', JSON.stringify(data.Search, null, 2), (error) => {
  if (error) throw error;
})



