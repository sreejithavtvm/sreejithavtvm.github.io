
$(document).ready(function(){/* activate sidebar */
$('#sidebar').affix({
  offset: {
    top: 235
  }
});

/* activate scrollspy menu */
var $body   = $(document.body);
var navHeight = $('.navbar').outerHeight(true) + 10;

$body.scrollspy({
	target: '#leftCol',
	offset: navHeight
});

/* smooth scrolling sections */
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, 1000);
        return false;
      }
    }
});

// window.setTimeout(function() {
//     $(".alert").fadeTo(1500, 0).slideUp(500, function(){
//         $(this).remove();
//     });
// }, 5000);


});

function toggle(id) {
			$("#"+id).slideToggle('slow');
			return false;
        };

$('#modal1').on('hidden.bs.modal', function () {document.getElementById('vid1').pause();});
$('#modal2').on('hidden.bs.modal', function () {document.getElementById('vid2').pause();});
$('#modal3').on('hidden.bs.modal', function () {document.getElementById('vid3').pause();});
$('#modal4').on('hidden.bs.modal', function () {document.getElementById('vid4').pause();});
$('#modal5').on('hidden.bs.modal', function () {document.getElementById('vid5').pause();});
$('#modal6').on('hidden.bs.modal', function () {document.getElementById('vid6').pause();});
$('#modal7').on('hidden.bs.modal', function () {document.getElementById('vid7').pause();});
$('#modal8').on('hidden.bs.modal', function () {document.getElementById('vid8').pause();});
$('#modal9').on('hidden.bs.modal', function () {document.getElementById('vid9').pause();});
$('#modal10').on('hidden.bs.modal', function () {document.getElementById('vid10').pause();});
$('#modal11').on('hidden.bs.modal', function () {document.getElementById('vid11').pause();});
$('#modal12').on('hidden.bs.modal', function () {document.getElementById('vid12').pause();});
$('#modal13').on('hidden.bs.modal', function () {document.getElementById('vid13').pause();});
$('#modal14').on('hidden.bs.modal', function () {document.getElementById('vid14').pause();});
$('#modal15').on('hidden.bs.modal', function () {document.getElementById('vid15').pause();});
$('#modal16').on('hidden.bs.modal', function () {document.getElementById('vid16').pause();});
$('#modal17').on('hidden.bs.modal', function () {document.getElementById('vid17').pause();});
$('#modal18').on('hidden.bs.modal', function () {document.getElementById('vid18').pause();});
$('#modal19').on('hidden.bs.modal', function () {document.getElementById('vid19').pause();});
$('#modal20').on('hidden.bs.modal', function () {document.getElementById('vid20').pause();});
$('#modal21').on('hidden.bs.modal', function () {document.getElementById('vid21').pause();});
$('#modal22').on('hidden.bs.modal', function () {document.getElementById('vid22').pause();});
$('#modal23').on('hidden.bs.modal', function () {document.getElementById('vid23').pause();});
$('#modal24').on('hidden.bs.modal', function () {document.getElementById('vid24').pause();});
$('#modal25').on('hidden.bs.modal', function () {document.getElementById('vid25').pause();});
$('#modal26').on('hidden.bs.modal', function () {document.getElementById('vid26').pause();});
$('#modal27').on('hidden.bs.modal', function () {document.getElementById('vid27').pause();});
$('#modal28').on('hidden.bs.modal', function () {document.getElementById('vid28').pause();});
$('#modal29').on('hidden.bs.modal', function () {document.getElementById('vid29').pause();});
$('#modal30').on('hidden.bs.modal', function () {document.getElementById('vid30').pause();});
$('#modal31').on('hidden.bs.modal', function () {document.getElementById('vid31').pause();});
$('#modal32').on('hidden.bs.modal', function () {document.getElementById('vid32').pause();});
$('#modal33').on('hidden.bs.modal', function () {document.getElementById('vid33').pause();});
$('#modal34').on('hidden.bs.modal', function () {document.getElementById('vid34').pause();});
$('#modal35').on('hidden.bs.modal', function () {document.getElementById('vid35').pause();});
$('#modal36').on('hidden.bs.modal', function () {document.getElementById('vid36').pause();});
$('#modal37').on('hidden.bs.modal', function () {document.getElementById('vid37').pause();});
$('#modal38').on('hidden.bs.modal', function () {document.getElementById('vid38').pause();});
$('#modal39').on('hidden.bs.modal', function () {document.getElementById('vid39').pause();});
$('#modal40').on('hidden.bs.modal', function () {document.getElementById('vid40').pause();});
$('#modal41').on('hidden.bs.modal', function () {document.getElementById('vid41').pause();});
$('#modal42').on('hidden.bs.modal', function () {document.getElementById('vid42').pause();});
$('#modal43').on('hidden.bs.modal', function () {document.getElementById('vid43').pause();});
$('#modal44').on('hidden.bs.modal', function () {document.getElementById('vid44').pause();});
$('#modal45').on('hidden.bs.modal', function () {document.getElementById('vid45').pause();});
$('#modal46').on('hidden.bs.modal', function () {document.getElementById('vid46').pause();});
$('#modal47').on('hidden.bs.modal', function () {document.getElementById('vid47').pause();});
$('#modal48').on('hidden.bs.modal', function () {document.getElementById('vid48').pause();});
$('#modal49').on('hidden.bs.modal', function () {document.getElementById('vid49').pause();});
$('#modal50').on('hidden.bs.modal', function () {document.getElementById('vid50').pause();});
$('#modal51').on('hidden.bs.modal', function () {document.getElementById('vid51').pause();});
$('#modal52').on('hidden.bs.modal', function () {document.getElementById('vid52').pause();});
$('#modal53').on('hidden.bs.modal', function () {document.getElementById('vid53').pause();});
$('#modal54').on('hidden.bs.modal', function () {document.getElementById('vid54').pause();});
$('#modal55').on('hidden.bs.modal', function () {document.getElementById('vid55').pause();});
$('#modal56').on('hidden.bs.modal', function () {document.getElementById('vid56').pause();});
$('#modal57').on('hidden.bs.modal', function () {document.getElementById('vid57').pause();});
$('#modal58').on('hidden.bs.modal', function () {document.getElementById('vid58').pause();});
$('#modal59').on('hidden.bs.modal', function () {document.getElementById('vid59').pause();});
$('#modal60').on('hidden.bs.modal', function () {document.getElementById('vid60').pause();});
$('#modal61').on('hidden.bs.modal', function () {document.getElementById('vid61').pause();});
$('#modal62').on('hidden.bs.modal', function () {document.getElementById('vid62').pause();});
$('#modal63').on('hidden.bs.modal', function () {document.getElementById('vid63').pause();});
$('#modal64').on('hidden.bs.modal', function () {document.getElementById('vid64').pause();});
$('#modal65').on('hidden.bs.modal', function () {document.getElementById('vid65').pause();});
$('#modal66').on('hidden.bs.modal', function () {document.getElementById('vid66').pause();});
$('#modal67').on('hidden.bs.modal', function () {document.getElementById('vid67').pause();});
$('#modal68').on('hidden.bs.modal', function () {document.getElementById('vid68').pause();});
$('#modal69').on('hidden.bs.modal', function () {document.getElementById('vid69').pause();});
$('#modal70').on('hidden.bs.modal', function () {document.getElementById('vid70').pause();});
$('#modal71').on('hidden.bs.modal', function () {document.getElementById('vid71').pause();});
$('#modal72').on('hidden.bs.modal', function () {document.getElementById('vid72').pause();});
$('#modal73').on('hidden.bs.modal', function () {document.getElementById('vid73').pause();});
$('#modal74').on('hidden.bs.modal', function () {document.getElementById('vid74').pause();});
$('#modal75').on('hidden.bs.modal', function () {document.getElementById('vid75').pause();});
$('#modal76').on('hidden.bs.modal', function () {document.getElementById('vid76').pause();});
$('#modal77').on('hidden.bs.modal', function () {document.getElementById('vid77').pause();});
$('#modal78').on('hidden.bs.modal', function () {document.getElementById('vid78').pause();});
$('#modal79').on('hidden.bs.modal', function () {document.getElementById('vid79').pause();});
$('#modal80').on('hidden.bs.modal', function () {document.getElementById('vid80').pause();});
$('#modal81').on('hidden.bs.modal', function () {document.getElementById('vid81').pause();});
$('#modal82').on('hidden.bs.modal', function () {document.getElementById('vid82').pause();});
$('#modal83').on('hidden.bs.modal', function () {document.getElementById('vid83').pause();});
$('#modal84').on('hidden.bs.modal', function () {document.getElementById('vid84').pause();});
$('#modal85').on('hidden.bs.modal', function () {document.getElementById('vid85').pause();});
$('#modal86').on('hidden.bs.modal', function () {document.getElementById('vid86').pause();});
$('#modal87').on('hidden.bs.modal', function () {document.getElementById('vid87').pause();});
$('#modal88').on('hidden.bs.modal', function () {document.getElementById('vid88').pause();});
$('#modal89').on('hidden.bs.modal', function () {document.getElementById('vid89').pause();});
$('#modal90').on('hidden.bs.modal', function () {document.getElementById('vid90').pause();});
$('#modal91').on('hidden.bs.modal', function () {document.getElementById('vid91').pause();});
$('#modal92').on('hidden.bs.modal', function () {document.getElementById('vid92').pause();});
$('#modal93').on('hidden.bs.modal', function () {document.getElementById('vid93').pause();});
$('#modal94').on('hidden.bs.modal', function () {document.getElementById('vid94').pause();});
$('#modal95').on('hidden.bs.modal', function () {document.getElementById('vid95').pause();});
$('#modal96').on('hidden.bs.modal', function () {document.getElementById('vid96').pause();});
$('#modal97').on('hidden.bs.modal', function () {document.getElementById('vid97').pause();});
$('#modal98').on('hidden.bs.modal', function () {document.getElementById('vid98').pause();});
$('#modal99').on('hidden.bs.modal', function () {document.getElementById('vid99').pause();});
