 app.directive ('modalWindow', function(){
    return {
	restrict: 'A',
	scope: false,
	link: function (scope, el, attrs) {
		var 
		$drag = if attrs.handle then angular.element(attrs.handle) else el

		el.css
			zIndex: 9999
			position: 'fixed'

		$drag.css cursor: 'move'

		h = el.outerHeight()
		w = el.outerWidth()

		$drag.on 'mousedown', (e) ->
			y = el.offset().top + h - e.screenY
			x = el.offset().left + w - e.screenX

			$drag.on 'mousemove', (e) ->
				el.css
					top: e.screenY + y - h
					left: e.screenX + x - w

				e.preventDefault()

		$drag.on 'mouseup mouseleave', -> $drag.off 'mousemove'
		}
	}  
 });
		
		(function(){app.directive("ngDraggable",function(){return{restrict:"A",scope:!1,link:function(e,n,o){
		var t,r,s;
		return t=o.handle?angular.element(o.handle):n,
		n.css({zIndex:9999,position:"fixed"}),
		t.css({cursor:"move"}),
		r=n.outerHeight(),
		s=n.outerWidth(),
		t.on("mousedown",
		function(e){var o,u;return u=n.offset().top+r-e.screenY,o=n.offset().left+s-e.screenX,t.on("mousemove",function(e){return n.css({top:e.screenY+u-r,left:e.screenX+o-s}),e.preventDefault()})}),t.on("mouseup mouseleave",function(){return t.off("mousemove")})}}})}).call(this);