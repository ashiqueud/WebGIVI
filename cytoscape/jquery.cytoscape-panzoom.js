
/* jquery.cytoscape-panzoom.min.js */

/**
 * This file is part of cytoscape.js 2.0.2.
 * 
 * Cytoscape.js is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 * 
 * Cytoscape.js is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Lesser General Public License along with
 * cytoscape.js. If not, see <http://www.gnu.org/licenses/>.
 */
 
(function(a){var b={zoomFactor:0.05,zoomDelay:45,minZoom:0.1,maxZoom:10,fitPadding:50,panSpeed:10,panDistance:10,panDragAreaSize:75,panMinPercentSpeed:0.25,panInactiveArea:8,panIndicatorMinOpacity:0.5,autodisableForMobile:true,sliderHandleIcon:"icon-minus",zoomInIcon:"icon-plus",zoomOutIcon:"icon-minus",resetIcon:"icon-resize-full"};a.fn.cytoscapePanzoom=function(f){var c=a.extend(true,{},b,f);var d=f;var e={destroy:function(){var g=a(this);g.find(".ui-cytoscape-panzoom").remove()},init:function(){var g="ontouchstart" in window;
if(g&&c.autodisableForMobile){return a(this)}return a(this).each(function(){var k=a(this);var J=a('<div class="ui-cytoscape-panzoom"></div>');k.append(J);if(c.staticPosition){J.addClass("ui-cytoscape-panzoom-static")}var A=a('<div class="ui-cytoscape-panzoom-zoom-in ui-cytoscape-panzoom-zoom-button"><span class="icon '+c.zoomInIcon+'"></span></div>');J.append(A);var o=a('<div class="ui-cytoscape-panzoom-zoom-out ui-cytoscape-panzoom-zoom-button"><span class="icon '+c.zoomOutIcon+'"></span></div>');
J.append(o);var q=a('<div class="ui-cytoscape-panzoom-reset ui-cytoscape-panzoom-zoom-button"><span class="icon '+c.resetIcon+'"></span></div>');J.append(q);var p=a('<div class="ui-cytoscape-panzoom-slider"></div>');J.append(p);p.append('<div class="ui-cytoscape-panzoom-slider-background"></div>');var G=a('<div class="ui-cytoscape-panzoom-slider-handle"><span class="icon '+c.sliderHandleIcon+'"></span></div>');p.append(G);var v=a('<div class="ui-cytoscape-panzoom-no-zoom-tick"></div>');p.append(v);
var x=a('<div class="ui-cytoscape-panzoom-panner"></div>');J.append(x);var P=a('<div class="ui-cytoscape-panzoom-panner-handle"></div>');x.append(P);var H=a('<div class="ui-cytoscape-panzoom-pan-up ui-cytoscape-panzoom-pan-button"></div>');var Q=a('<div class="ui-cytoscape-panzoom-pan-down ui-cytoscape-panzoom-pan-button"></div>');var L=a('<div class="ui-cytoscape-panzoom-pan-left ui-cytoscape-panzoom-pan-button"></div>');var t=a('<div class="ui-cytoscape-panzoom-pan-right ui-cytoscape-panzoom-pan-button"></div>');
x.append(H).append(Q).append(L).append(t);var h=a('<div class="ui-cytoscape-panzoom-pan-indicator"></div>');x.append(h);function y(V){var R={x:V.originalEvent.pageX-x.offset().left-x.width()/2,y:V.originalEvent.pageY-x.offset().top-x.height()/2};var T=c.panDragAreaSize;var W=Math.sqrt(R.x*R.x+R.y*R.y);var S=Math.min(W/T,1);if(W<c.panInactiveArea){return{x:NaN,y:NaN}}R={x:R.x/W,y:R.y/W};S=Math.max(c.panMinPercentSpeed,S);var U={x:-1*R.x*(S*c.panDistance),y:-1*R.y*(S*c.panDistance)};return U}function B(){clearInterval(u);
a(window).unbind("mousemove",z);h.hide()}function i(X){var Z=X;var V=Math.sqrt(Z.x*Z.x+Z.y*Z.y);var W={x:-1*Z.x/V,y:-1*Z.y/V};var Y=x.width();var S=x.height();var U=V/c.panDistance;var T=Math.max(c.panIndicatorMinOpacity,U);var R=255-Math.round(T*255);h.show().css({left:Y/2*W.x+Y/2,top:S/2*W.y+S/2,background:"rgb("+R+", "+R+", "+R+")"})}function w(){var T=k.cytoscape("get");var S=T.pan();var R=T.zoom();M=k.width()/2;K=k.height()/2}var F=false;function j(){F=true;w()}function r(){F=false}var M,K;function N(S){var R=k.cytoscape("get");
if(!F){w()}R.zoom({level:S,position:{x:M,y:K}})}var u;var z=function(R){R.stopPropagation();R.preventDefault();clearInterval(u);var S=y(R);if(isNaN(S.x)||isNaN(S.y)){h.hide();return}i(S);u=setInterval(function(){k.cytoscape("get").panBy(S)},c.panSpeed)};P.bind("mousedown",function(R){z(R);a(window).bind("mousemove",z)});P.bind("mouseup",function(){B()});a(window).bind("mouseup blur",function(){B()});p.bind("mousedown",function(){return false});var D;var n=false;var l=2;function I(ab,S){if(S===undefined){S=0
}var aa=l;var T=0+aa;var Y=p.height()-G.height()-2*aa;var X=ab.pageY-p.offset().top-S;if(X<T){X=T}if(X>Y){X=Y}var V=1-(X-T)/(Y-T);G.css("top",X);var U=c.minZoom;var ac=c.maxZoom;var Z=Math.log(U)/Math.log(ac);var R=(1-Z)*V+Z;var W=Math.pow(ac,R);if(W<U){W=U}else{if(W>ac){W=ac}}N(W)}var m,O;G.bind("mousedown",m=function(T){var S=T.target===G[0]?T.offsetY:0;n=true;j();G.addClass("active");var R=0;a(window).bind("mousemove",O=function(V){var U=+new Date;if(U>R+10){R=U}else{return false}I(V,S);return false
});a(window).bind("mouseup",function(){a(window).unbind("mousemove",O);n=false;G.removeClass("active");r()});return false});p.bind("mousedown",function(R){if(R.target!==G[0]){m(R);I(R)}});function C(){var S=k.cytoscape("get");var W=S.zoom();var U=c.minZoom;var aa=c.maxZoom;var Z=Math.log(U)/Math.log(aa);var R=Math.log(W)/Math.log(aa);var V=1-(R-Z)/(1-Z);var T=l;var Y=p.height()-G.height()-2*l;var X=V*(Y-T);if(X<T){X=T}if(X>Y){X=Y}G.css("top",X)}C();var s=k.cytoscape("get");s.on("zoom",function(){if(!n){C()
}});(function(){var V=1;var T=c.minZoom;var Z=c.maxZoom;var Y=Math.log(T)/Math.log(Z);var R=Math.log(V)/Math.log(Z);var U=1-(R-Y)/(1-Y);if(U>1||U<0){v.hide();return}var S=l;var X=p.height()-G.height()-2*l;var W=U*(X-S);if(W<S){W=S}if(W>X){W=X}v.css("top",W)})();function E(S,R){var T;S.bind("mousedown",function(U){U.preventDefault();U.stopPropagation();if(U.button!=0){return}var V=k.cytoscape("get");j();T=setInterval(function(){var X=V.zoom();var W=V.zoom()*R;if(W<c.minZoom){W=c.minZoom}if(W>c.maxZoom){W=c.maxZoom
}if((W==c.maxZoom&&X==c.maxZoom)||(W==c.minZoom&&X==c.minZoom)){return}N(W)},c.zoomDelay);return false});a(window).bind("mouseup blur",function(){clearInterval(T);r()})}E(A,(1+c.zoomFactor));E(o,(1-c.zoomFactor));q.bind("mousedown",function(R){if(R.button!=0){return}var S=k.cytoscape("get");if(S.elements().size()===0){S.reset()}else{S.fit(c.fitPadding)}return false})})}};if(e[d]){return e[d].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof d=="object"||!d){return e.init.apply(this,arguments)
}else{a.error("No such function `"+d+"` for jquery.cytoscapePanzoom")}}return a(this)};a.fn.cyPanzoom=a.fn.cytoscapePanzoom})(jQuery);