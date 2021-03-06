var select;

$('#sound1').on('click', function() {
	$( '#sound-file' ).get(0).play() ;
	select = $( '#sound-file' );
});

$('#sound2').on('click', function() {
	$( '#sound-file2' ).get(0).play() ;
	select = $( '#sound-file2' );
});

$('#sound3').on('click', function() {
	$( '#sound-file3' ).get(0).play() ;
	select = $( '#sound-file3' );
});

var aX = 0,
	aY = 0,
	aZ = 0;
var oldY = 0;

$('#permission').on('click', function() {
	ClickRequestDeviceSensor();
})
function ClickRequestDeviceSensor(){
  DeviceMotionEvent.requestPermission().then( function( response ){
    if( response === 'granted' ){
			window.addEventListener("devicemotion", (dat) => {
				aX = dat.accelerationIncludingGravity.x;
				aY = dat.accelerationIncludingGravity.y;
				aZ = dat.accelerationIncludingGravity.z;
			});
    }
  }).catch( function( e ){
    console.log( e );
  });
}

// 加速度センサの値が変化したら実行される devicemotion イベント
window.addEventListener("devicemotion", (dat) => {
	aX = dat.accelerationIncludingGravity.x;
	aY = dat.accelerationIncludingGravity.y;
	aZ = dat.accelerationIncludingGravity.z;
});

var timer = window.setInterval(() => {
	displayData();
}, 300);

// データを表示する displayData 関数
function displayData() {
	var txt = document.getElementById("txt");
	txt.innerHTML = "x: " + aX + "<br>" // x軸の値
		+
		"y: " + aY + "<br>"
		+
		"z: " + aZ + "<br>"
		+
		'abs3 ' + 'yの差分 ' + Math.abs(aY - oldY);

		if(aY - oldY > 3 && oldY !== 0) {
			if(select) {
				select.get(0).play() ;
			}
			// $( '#sound-file3' ).get(0).play() ;
			// $( '#sound-file3' ).trigger('click');
		}
		oldY = aY;
}
