//set zero
function setZero (data){
	if(data < 10){
		return `0${data}`;
	}else{
		return data;
	}
} 

class Player {
	constructor(config,url,lists){
		this.url = url;
		this.lists = lists;
		this.audio = new Audio();
		this.ext = '.mp3';
		this.currentSong = '';
		this.index = 0;
		this.volume = 0.3;

		this.curTime = config.curTime;
		this.currentPlayName = config.currentPlayName;
		this.durTime = config.durTime;
		this.left = config.left;
		this.play = config.play;
		this.right = config.right;
		this.sliderTime = config.sliderTime;
		this.speaker = config.speaker;
		this.songList = config.songList;
		this.speakerSlider = config.speakerSlider;

		//event
		this.right.addEventListener('click', () => {
			this.Next();
		})	
		this.play.addEventListener('click',()=>{
			this.Play();
		})
		this.left.addEventListener('click',()=>{
			this.Prev();
		})
		this.sliderTime.addEventListener('input',(e)=> {
			this.SliderTimeChange(e.target.value)
		})
		this.songList.addEventListener('click',(e)=>{
			this.songListClick(e.target.innerHTML);
		})
		this.speakerSlider.addEventListener('input',(e)=> {
			this.volumeChange(e.target.value);
		})

	}

	main (){
		//init
		this.init();		
	}

	init (){
		const { url, lists, ext,index } = this;
		this.audio.src = url + lists[index] + ext;
		this.currentSong = lists[index];
		this.audio.volume = this.volume;

		this.showUI();
	}

	showUI (){
		setInterval(()=>{
			this.showTime();
		},1000);
		this.showLists();

	}

	showTime (){
		const { audio } = this;

		//show dur
		let dur = audio.duration;
		let dur_min = Math.round(dur / 60);
		let dur_sec = Math.round(dur % 60);

		this.durTime.innerHTML = `${setZero(dur_min)}:${setZero(dur_sec)}`; 
		
		//show cur
		let cur = audio.currentTime;
		let cur_min = Math.round(cur / 60);
		let cur_sec = Math.round(cur % 60);

		this.curTime.innerHTML = `${setZero(cur_min)}:${setZero(cur_sec)}`;

		//show slidebar
		let per = Math.round((cur / dur) * 100);
		this.sliderTime.value = per;

		//sond ended
		if(audio.ended){
			this.songEnded();
		}		
	}

	showLists (){
		this.currentPlayName.innerHTML = this.currentSong;
		let li = '';
		this.lists.forEach(list => {
			if (this.currentSong == list){
				li += `
			<li class="cur-song">${list}</li>
			`
			}else{
				li += `
			<li>${list}</li>
			`
			}
			
		})
		this.songList.innerHTML = li;
	}

	showVolume (){
		this.speakerSlider.value = this.volume;
	}

	//Event
	songEnded (){
		const { url, lists, ext } = this;
		this.index++;
		this.audio.src = url + lists[this.index] + ext;
		this.currentSong = lists[this.index];
		this.audio.play()

		//UI
		this.showUI();
	}
	
	Play (){
		if(this.audio.paused){
			this.audio.play();
		}else{
			this.audio.pause();
		}
	}

	Next (){
		this.index++;
		const { audio, url, ext, currentSong, lists } = this;

		if(this.index == lists.length){
			this.index = 0;
		}
		this.audio.src = url + lists[this.index] + ext;
		this.currentSong = lists[this.index];
		this.audio.play()

		this.showUI();
	}

	Prev (){
		const { audio, url, ext, currentSong, lists } = this;

		if (this.index == 0) {
			this.index = lists.length;
		}
		this.index --;
		this.audio.src = url + lists[this.index] + ext;
		this.currentSong = lists[this.index];
		this.audio.play()

		this.showUI();
	}

	SliderTimeChange (val){
		let dur = this.audio.duration / 100;
		this.audio.currentTime = dur * val;
	}

	songListClick (name){
		this.lists.forEach((n,index) => {
			if(name == n){
				const { audio, url, ext } = this;

				this.audio.src = url + lists[index] + ext;
				this.currentSong = lists[index];
				this.audio.play()

				this.showUI();
			}
		})
	}

	volumeChange (val){
		this.volume = val;
		this.audio.volume = val;
		this.showVolume();
	}


}
