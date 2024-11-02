
//globally decleration to store songs url
var songs=[];

var Title=[];

var index=0;

//to store current song index
var current_song_index=0;


var count=0;


// to fetch the songs from the files
async function GetSongs(){

//fetching the songs file from the localhost
    let x=await fetch("http://localhost:8000/");
    let result=await x.text();
    // console.log(result);


    //creating an element to store the result in
    let div=document.createElement("div");
    div.innerHTML=result;
    let as=div.getElementsByTagName("a");
    // console.log(as);

    //creating an empty array for storing songs href
    let Songs=[];

    //to store innertext to the array
    let text=[];
    
//using for loop to check every 'a'  element contains mp3 file or not and adding to the Songs Array
 for(i=0;i<as.length;i++){
const element=as[i];
 if(element.href.endsWith(".mp3" || ".ogg" || ".wav")){

Songs.push(element.href);

 }

 //adding songs to the library
 if(element.innerText.endsWith(".mp3" || ".ogg" || ".wav")){
    text.push(element.innerText);

    Title.push(element.innerText);


//setting the playlist card with images ,artist name,and description for each song
var parent=document.createElement("div");
parent.className="parent";
parent.innerHTML=`<img id="playbutton" src="playbutton.svg" alt="playbutton" height="" width="">

<div class="view_Card">

<div class="image">
<img class="song_image" style="border-radius: 6px;" src="https://i.scdn.co/image/ab67706f00000002ab09371a616348f3fad1cfd2" alt="image" height="100%" width="100%">

</div>
</div>

<div class="bottom_banner">
<span id="banner"><h4 class="Artist_name"></h4>
<div class="Description"></div></span>

</div>`;

//to append the card to the grid file
document.getElementById("grid").appendChild(parent);

if(parent){
await Album_info_Set(element.innerText,element.innerText);

}
//adding eventlistener which will link to playfunction() that takes corresponding song href when clicked
parent.addEventListener('click',function(event){
event.preventDefault();
Play_Function(element.href,element.innerText);

});



    //Creating a pragraph element and adding to the card for displaying songs
    let paragraph=document.createElement("a");
    // paragraph.href=element.href;
    paragraph.className="song";


    //adding eventlistener which will link to playfunction() that takes corresponding song href when clicked
    paragraph.addEventListener("click",function(event) {
        event.preventDefault(); // Prevent the default link behavior
        Play_Function(element.href,element.innerText); 
    });
    
    document.querySelector(".card").append(paragraph);



}

 }
 //adding songs to the Your Library

let all_paragraph=document.querySelectorAll(".song");
// console.log(all_paragraph);

for(i=0;i<text.length;i++){
   all_paragraph[i].innerHTML=text[i];
}
 

 return Songs;

}


 async function main(){

    //globally song 
    songs=await GetSongs();

    //creating an audio source if not present at beginnning
    var audio_source=document.getElementById("music_source");
    if(!audio_source){
 var source=document.createElement("source");
 source.id="music_source";
 source.src=songs[current_song_index];
 source.type="audio/mp3";
 document.getElementById("audio_player").append(source);

 //calling function for accessing the artist name and image 
 Album_info_Display(Title[current_song_index]);
 
        
    }

    Get_Set_time();

    //initially setting the title of the song 
    document.getElementById("song_name").innerHTML=Title[current_song_index];






}
main();


// async function file_input(){

    //accessing file from input file type
    document.getElementById("add").addEventListener('change', async function (event){
    const files=event.target.files;

    console.log(files);

    //clearing the previous array
    Title=[];
    songs=[];
    index=0;

    //to delete Create Playlist Card
    document.getElementById("top").remove();
    
    // to delete previous stored music from library and add new musics
    var remove_song=document.querySelectorAll(".song");
    var remove_albums=document.querySelectorAll(".parent");
    
    for(i=0;i<remove_song.length;i++){
     remove_song[i].remove();
      
     }
     for(i=0;i<remove_albums.length;i++){
        remove_albums[i].remove();
     }
     
     for(let i=0;i<files.length;i++){
         if(files[i].name.endsWith(".mp3" || ".wav" || ".ogg")){

            

            //adding name of the song to the Title array
            Title.push(files[i].name);

            //adding the url of the files to the songs array
            const fileurl=URL.createObjectURL(files[i]);
            
            songs.push(fileurl);
            
            
            //setting the playlist card with images ,artist name,and description for each song
            var parent=document.createElement("div");
            parent.className="parent";
            parent.innerHTML=`<img id="playbutton" src="playbutton.svg" alt="playbutton" height="" width="">

            <div class="view_Card">
            
            <div class="image">
            <img class="song_image" style="border-radius: 6px;" src="Loading_logo.svg" alt="image" height="100%" width="100%">
            
            </div>
            </div>
            
            <div class="bottom_banner">
            <span id="banner"><h4 class="Artist_name"></h4>
            <div class="Description"></div></span>
            
            </div>`;

            //to append the card to the grid file
            document.getElementById("grid").appendChild(parent);
        
        if(parent){
           await Album_info_Set(files[i].name,files[i].name);
        //    console.log(files[i].name);
 
        }
        //adding eventlistener which will link to playfunction() that takes corresponding song href when clicked
       parent.addEventListener('click',function(event){
       event.preventDefault();
       Play_Function(fileurl,files[i].name);
       
    });


 


    
    

    let paragraph=document.createElement("a");
            // paragraph.href=element.href;
            paragraph.className="song";
        
            
            //adding eventlistener which will link to playfunction() that takes corresponding song href when clicked
            paragraph.addEventListener("click",function(event) {
                event.preventDefault(); // Prevent the default link behavior
                Play_Function(fileurl,files[i].name); 
                
                
                
            });
            
            document.querySelector(".card").append(paragraph);
            count++;
            
        }
    }
    
        //adding songs to the Your Library

            let all_paragraph=document.querySelectorAll(".song");
            
            for(i=0;i<all_paragraph.length;i++){
               all_paragraph[i].innerHTML=Title[i];
            }
        
        
            //creating an audio source if not present at beginnning
            var audio_source=document.getElementById("music_source");
            if(!audio_source){
                var source=document.createElement("source");
                source.id="music_source";
                source.src=songs[current_song_index];
                source.type="audio/mp3";
                document.getElementById("audio_player").append(source);
                
                //calling function for accessing the artist name and image 
                Album_info_Display(Title[current_song_index]);
                
        }
        
       await Get_Set_time();

        //initially setting the title of the song 
        document.getElementById("song_name").innerHTML=Title[current_song_index];



        
    });
// }
// file_input();
    


//function 
async function add_new_Library(){
    var remove_song=await document.querySelectorAll(".song");

    for(i=0;i<remove_song.length;i++){
        remove_song[i].remove();
    }
    

    main();
}



async function play(){

    
    // document.querySelector(".play").style.backgroundColor="#1fdf64";
    document.querySelector(".play").style.borderradius="10px";

    
   
    var music_play=document.getElementById("audio_player");
    var audio_source=document.getElementById("music_source");


    if(music_play.paused){
        document.getElementById("play_pause").src="pause.svg";
       }
else{
    document.getElementById("play_pause").src="play.svg";
}

   // to add only if there is no source for audio
    if(!audio_source){

         //to creat and  add audio href file to the source src of the audio element
        var source=document.createElement('source');
    
        source.src=songs[current_song_index];
        source.id="music_source";
        source.type='audio/mp3';
        document.getElementById("audio_player").append(source);

        //calling function for accessing the artist name and image 
 Album_info_Display(Title[current_song_index]);
    }
   //accessing the duration of the song and adding to total_duration
   Get_Set_time();

    return music_play.paused? music_play.play():music_play.pause();
}




async function previous(){
//update music index randomly if shuffle is on;
if(is_random==true){
    current_song_index=Math.trunc(Math.random()*songs.length);
}
else{

    current_song_index=(current_song_index+songs.length-1)%songs.length;
}

//calling function accessing artist name and image
 Album_info_Display(Title[current_song_index]);

 var music_play=document.getElementById("audio_player");

 var audio_source=document.getElementById("music_source");
 if(audio_source){
    audio_source.remove();
    music_play.pause();
    music_play.load();
 }

 var source=document.createElement('source');
 source.src=songs[current_song_index];
 source.id="music_source";
 source.type='audio/mp3';

 //setting the title for the song
 document.getElementById("song_name").innerHTML=Title[current_song_index];

 music_play.append(source);

 music_play.play();

 if(music_play.paused){
    document.getElementById("play_pause").src="play.svg";
}
else{
   document.getElementById("play_pause").src="pause.svg";
}

 //accessing the duration of the song and adding to total_duration
 Get_Set_time();
    
}




async function next(){
//update music index randomly if shuffle is on;
if(is_random==true){
    current_song_index=Math.trunc(Math.random()*songs.length);
}
else{

    current_song_index=(current_song_index+1)%songs.length;
}

//calling function accessing artist name and image
Album_info_Display(Title[current_song_index]);


var music_play=document.getElementById("audio_player");
var audio_source=document.getElementById("music_source");
if(audio_source){
    audio_source.remove();
    music_play.pause();
    music_play.load();
}

var source=document.createElement("source");
source.id="music_source";
source.src=songs[current_song_index];
source.type="audio/mp3";

//adding the title for the song
document.getElementById("song_name").innerHTML=Title[current_song_index];
document.getElementById("song_name").direction="right";
music_play.append(source);


music_play.play();
if(music_play.paused){
    document.getElementById("play_pause").src="play.svg";
}
else{
    document.getElementById("play_pause").src="pause.svg";
}

 //accessing the duration of the song and adding to total_duration
Get_Set_time();


}




async function Play_Function(href,SongName){

    // document.querySelector(".play").style.backgroundColor="#1fdf64";
    document.querySelector(".play").style.borderradius="10px";

    //calling function accessing artist name and image
Album_info_Display(SongName);

var music_play=document.getElementById("audio_player");

if(!music_play.pause){
    document.getElementById("play_pause").src="play.svg";
}
else{
    document.getElementById("play_pause").src="pause.svg";
}


var audio_source=document.getElementById("music_source");
if(audio_source){
    audio_source.remove();
    music_play.pause();
    music_play.load();


}
var source=document.createElement("source");
source.id="music_source";
source.src=href;
source.type="audio/mp3";

document.getElementById("audio_player").append(source);
music_play.play();
document.getElementById("song_name").innerHTML=SongName;

//updating the current index



Get_Set_time();

}



//creating function to get and set time for the song
async function Get_Set_time(){

     //accessing the duration of the song and adding to total_duration
     var audio_duration=document.getElementById("audio_player");
     audio_duration.addEventListener('loadedmetadata',function(){
       
        //getting duration in second
        var duration=audio_duration.duration;
          
        //converting to minute and second
         var minute=(duration/60).toFixed(0);
         var second=(duration%60).toFixed(0);

         //adding zero if needed
         var final_duration=minute+':'+( second< 10 ?'0'+second :second);

     document.getElementById("total_duration").innerHTML=final_duration;

     });
}






//to search the songs albums and images from the Spotify website using SpotifyWebAPI


//declearing client id and secret
const clientId='530e8bc51fca4e27b185c54e326b68b6';
const clientSecret='443c6024c05c4ca7b7640631b412d6c4';

async function getAccessToken(){
    const token=await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const final_token=await token.json();
    // console.log(final_token);
    return final_token.access_token;

}

//function to search album for the SpotifyWebApi


async function Search_album(albumName){
    const token_access= await getAccessToken();
    // https://cors-anywhere.herokuapp.com/
    const result = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(albumName)}&type=album`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token_access
        }
    });
const data=await result.json();

// console.log(data);
return data.albums.items[0];
}

//function to display the album information
async function Album_info_Set(albumName,Description){
    const album=await Search_album(albumName);
    //if the result is found
    if(album){

        // console.log("Album Name:"+album.name);
        // console.log("Artist Name:"+album.artists[0].name);
        // console.log("Relaese Date:"+album.release_date);
        // console.log("Image:"+album.images[0].url);  //get the first image url

        //adding image url to the img_album
        var album_image=album.images[0].url;
        
        // album_image.alt="Image";
        // album_image.id="img_album";
        
        document.getElementsByClassName("song_image")[index].src=album_image;
        document.getElementsByClassName("Artist_name")[index].innerHTML=album.name;
        document.getElementsByClassName("Description")[index].innerHTML=Description;
        index++;

    }

    else{
        console.log("Album not found");
    }


}
//function to set the album image
async function Album_info_Display(albumName){
    const album=await Search_album(albumName);
    //if the result is found
    if(album){

        // console.log("Album Name:"+album.name);
        // console.log("Artist Name:"+album.artists[0].name);
        // console.log("Relaese Date:"+album.release_date);
        // console.log("Image:"+album.images[0].url);  //get the first image url

        //adding image url to the img_album
        var album_image=album.images[0].url;;
        
        // album_image.alt="Image";
        // album_image.id="img_album";

        document.getElementById("img_album").src=album_image;

    }

    else{
        console.log("Album not found");
    }


}



//seeker bar for the music play
function seekbar(){

    var track=document.getElementById("audio_player");
    var seekBar=document.getElementById("progress_bar");
    

    //getting the position of clicked position in seekbar and updating music current time
    seekBar.addEventListener('click', function logkey(event) {
        var seekposition = event.offsetX / seekBar.offsetWidth;
        var seekTime = seekposition * track.duration;
        track.currentTime=seekTime;
    });

    // //displaying the seeked time
    // seekBar.addEventListener('mouseover',function logkey(event){
      
    //   var seekposition=event.offsetX/seekBar.offsetWidth;
    //   var seekTime=seekposition * track.duration;
    //   var minute=Math.trunc(seekTime.toFixed(0)/60);
    //   var second=(seekTime.toFixed(0)%60);
    //   var current_time=minute+":"+(second < 10 ?'0'+second : second);
    // //   console.log(current_time);
     
    // })

    //updating the song time if it is playing
    track.addEventListener('playing',function(_event){
        var duration=_event.target.duration;
        advance(duration,track);
    });

    //clear the timeout if the music is pause
    track.addEventListener('pause',function(_event){

        cancelAnimationFrame(timer);  // Use cancelAnimationFrame for stopping requestAnimationFrame
    })



    
var timer;


var advance=function(duration,element){

    var progress=document.getElementById("seeker");
    
    //getting the current time of the playing song
    var current_time=Math.trunc(element.currentTime);
    
    var minute=Math.trunc(current_time/60);
    var second=(current_time%60);
    
    //displaying time in minute and second in songbar as current time
    var current_time=minute+":"+(second < 10 ? '0'+second : second);
    document.getElementById("current_time").innerHTML=current_time;
    
    var seek_percentage=((element.currentTime)/duration);
    var percent=Math.min(seek_percentage*100,100);
  
    progress.style.width=percent+'%'

    if(percent<100){

        //for smooth animation use requestAnimationFrame in case of settimeout
        timer=requestAnimationFrame(function (){advance(duration, element)});
    }
    }
}

  
  


seekbar();
  




//function to change the volume using volume slider
var volumes=document.querySelector('input[type="range"]');
var volume_value=volumes.value;
var temp_value=volume_value;

volumes.addEventListener('input',function(){
    volume_value=volumes.value;
    temp_value=volume_value;

    if(volume_value==0){
        document.getElementById("mute_unmute_img").src="volume_mute.svg";
    }
    else{
        document.getElementById("mute_unmute_img").src="Volume.svg";
    }
    var audio=document.getElementById("audio_player");
    //converting the volume_value to decimal because volume takes only between 0 and 1
    audio.volume=volume_value/100;

    //update the slider background
     
     updateSliderBackground(volume_value);

})

document.getElementById("mute_unmute").addEventListener('click',function(){
    // volume_value=volumes.value;

    if(volume_value!=0){
       
        document.getElementById("mute_unmute_img").src="volume_mute.svg";

        var audio=document.getElementById("audio_player");
    //converting the volume_value to decimal because volume takes only between 0 and 1
    volume_value=0;
    audio.volume=0;
    //calling function
    updateSliderBackground(volume_value);

    }
    else{
        
        document.getElementById("mute_unmute_img").src="Volume.svg";

        var audio=document.getElementById("audio_player");
    //converting the volume_value to decimal because volume takes only between 0 and 1
    volume_value=temp_value;
    audio.volume=volume_value/100;
    //calling function to update background
    updateSliderBackground(temp_value);

        
    }
})

//function to update the background of slider
function updateSliderBackground(volume_value){

    // volumes.style.background='linear-gradient(to right, #e246ab 0%, #e246ab var(--value, ${volume_value}%), transparent var(--value, ${volume_value}%), transparent 100%);';
    document.getElementById("control_volume").style.setProperty('--value',volume_value+'%');


}




    //to update the current_song_index on the basis of currently playing music
    var music_play=document.getElementById("audio_player");
    document.getElementById("audio_player").addEventListener('playing',function(){
        var source=document.getElementById("music_source").src;
        for(i=0;i<songs.length;i++){
            if(source===songs[i]){
                current_song_index=i;
            }
        }
    
    });

    //to play next music automatically when music is ended
    music_play.addEventListener('ended',function(){
        // document.getElementById("play_pause").src="play.svg";

        //creating a tigger to paly the same music if is_repeat=true;
        if(is_repeat==true){
            play();
        }
        else if(is_repeat==true && is_random==true){

            play();
        }

        else if(is_random==true){
            next();
        }

        else{
            next();
        }
        
    })




    // to make the song repeat on loop
var is_repeat=false;
    document.getElementById("repeat").addEventListener('click',function(){
if(is_repeat==false){
    document.getElementById("repeat_logo").src="repeat_checked.svg";
    is_repeat=true;
}

else{ 
    document.getElementById("repeat_logo").src="repeat.svg";
    is_repeat=false;
}

    });



    //to make song play on shuffle /random order
    var is_random=false;
    document.getElementById("shuffle_music").addEventListener('click',function(){
        if(is_random==false){
            document.getElementById("shuffle_logo").src="shuffle_on.svg";
              is_random=true;

              //updating randomly current_song_index;
            //   current_song_index=Math.trunc(Math.random()*songs.length);
        }

        else{
            document.getElementById("shuffle_logo").src="shuffle.svg";
            is_random=false;
        }

    });