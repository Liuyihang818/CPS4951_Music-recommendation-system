// analysis：
// 1. get li index
// 2. change background picture
// 3. change player picture and text
// 4. change player btn as stop btn and title
// 5. roll the picture in the banner
// 6. play the song
// 7. stop and player
// 8. next and last song
// 9. show and close player


// grab data preparation

var index = 0; //li start index
var li = $(".banner ul li"); //grab all li elements
var img = $(".music .m_img img");//grab all img elements in player
var text = $(".music .m_text");//grab player text elements in player
var prev = $(".music .m_btn .m_prev");//grab prev btn
var play = $(".music .m_btn .m_play");//grab play btn 
var next = $(".music .m_btn .m_next");//grab next btn
var mp3 = $(".music .m_mp3");//grab mp3 element

var flag = false; //whether song has been playing, ture for yes
var close = true; // whether player has been showed, true for yes


// get click li index
li.click(function() {
	//use console.log to grab li index now clicked
	console.log($(this).index());
	index = $(this).index();

	//play song, 这里在下面封装
	show();
});


//封装歌曲show功能 to reduce the code
function show() {
	//change background from index 1
	change_bg(index+1);
	
	//change img text from index 1
	change_img_text(index+1);

	// change play btn to stop btn
	change_btn_title();

	// picture rotate
	img_rotate();

	//play mp3
	play_mp3();
}

function change_bg(idx){
	//change css style according to index
	$("body").css({
		"background":"url(img/campus"+ idx +".png) no-repeat",
		"background-size": "1950px 950px"
	});
}

function change_img_text(idx) {
	// attr 一个参数获取，两个参数设置
	// set player picture
	img.attr("src","img/song"+ idx +".png");
	//get title text according to index and change to text
	text.html(li.eq(index).attr("title"));
}


// change play btn to stop btn
function change_btn_title(){
	play.removeClass("m_play");//remove original play style
	play.addClass("m_pause");//add new stop style
	play.attr("title","stop");//set new attr title
}

// image rotate
function img_rotate(){
	//remove img rotate style to prevent rotate imgs all forever
	li.children().removeClass("img_rotate");

	// add rotate to li's children which are img
	li.eq(index).children().addClass("img_rotate");
}

// play mp3
function play_mp3(){
	//get selected data src
	// console.log(index()+1)
	mp3.attr("src", li.eq(index).attr("datasrc"));
	mp3.get(0).play();//固定写法，播放歌曲
	//set true or false flag
	flag = true;
}

//stop and play function
play.click(function(){
	//if song is playing
	//  1.we need stop song
	//  2.stop img rotate
	//  3.change stop btn to play btn
	//	4.title change to play
	if(flag){
		mp3.get(0).pause();
		li.eq(index).children().removeClass("img_rotate");
		play.removeClass("m_pause").addClass("m_play").attr("title","play");
		flag = false;
	}else{
		//if song is stop
	//  1.play song
	//  2.img rotate
	//  3.change play btn to stop btn
	//	4.title change to stop
		mp3.get(0).play();
		li.eq(index).children().addClass("img_rotate");
		play.removeClass("m_play").addClass("m_pause").attr("title","stop");
		flag = true;
		//if we use another background, we need use index + 1 to avoid bug
		//bug here: original bg will not change to index 1 bg if we first play it
		change_bg(index+1);
	}
});


//function last song, next song
prev.click(function(){
	index--;
	//bug here: index cann't be less than 0,which is the first index
	//change index back to the last index
	if (0 > index){
		index = li.length - 1;
	}
	//play songs
	show();
})

next.click(function(){
	index++;
	//bug here: index cann't be more than 0,which is the last index
	//change index back to the first index
	if (li.length-1 < index){
		index = 0;
	}
	//play songs
	show();
})

//hide the player 
$(".m_close").click(function(){
	//if show than hide
	if(close){
		$(this).addClass("m_open");
		$(".music").animate({"left":"-525px"},1000);
		close = false;
	}else{
		//if hide than show
		$(this).removeClass("m_open");
		$(".music").animate({"left":"0px"},1000);
		close = true;
	}
});