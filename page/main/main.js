(function(){
	$(document).ready(function(){
		
		$('li').click(function() {
			var active=$('.active');
			if($(this)==active) return ;
			$('.active').removeClass('active');
			$(this).addClass('active');
		});
		
	});
}())