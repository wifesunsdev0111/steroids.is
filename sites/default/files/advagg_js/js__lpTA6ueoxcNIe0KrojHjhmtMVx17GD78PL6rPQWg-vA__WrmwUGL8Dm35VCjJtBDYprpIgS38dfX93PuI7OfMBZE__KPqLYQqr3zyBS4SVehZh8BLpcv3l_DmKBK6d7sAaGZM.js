Drupal.TBMegaMenu=Drupal.TBMegaMenu||{};(function($){Drupal.TBMegaMenu.oldWindowWidth=0;Drupal.TBMegaMenu.displayedMenuMobile=false;Drupal.TBMegaMenu.supportedScreens=[980];Drupal.TBMegaMenu.menuResponsive=function(){var windowWidth=window.innerWidth?window.innerWidth:$(window).width();var navCollapse=$('.tb-megamenu').children('.nav-collapse');if(windowWidth<Drupal.TBMegaMenu.supportedScreens[0]){navCollapse.addClass('collapse');if(Drupal.TBMegaMenu.displayedMenuMobile){navCollapse.css({height:'auto',overflow:'visible'});}else{navCollapse.css({height:0,overflow:'hidden'});}}else{navCollapse.removeClass('collapse');if(navCollapse.height()<=0){navCollapse.css({height:'auto',overflow:'visible'});}}};Drupal.TBMegaMenu.focusNextPrevElement=function(direction){var focusableElements='a:not([disabled]), button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), details:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';var $current=$(document.activeElement);if($current.length){var $focusable=$(focusableElements).filter(function(){var $this=$(this);return $this.closest('.tb-megamenu-subnav').length===0&&$this.is(':visible');})
var index=$focusable.index($current);if(index>-1){if(direction==='next'){var nextElement=$focusable[index+1]||$focusable[0];}
else{var nextElement=$focusable[index-1]||$focusable[0];}
nextElement.focus();}}}
Drupal.behaviors.tbMegaMenuAction={attach:function(context){$('.tb-megamenu').once('tb-megamenu',function(){var navParent=document.querySelector('.tb-megamenu'),linkArray=new Array(),curPos=new Array(-1,-1,-1);$('.tb-megamenu').find('.level-1').children('a').not('.mobile-only').each(function(i,toplink){linkArray[i]=new Array();linkArray[i][-1]=toplink;$(toplink).data({coordinate:[i,-1]});$(toplink).next().children().children().children('.mega-col-nav').each(function(j,column){linkArray[i][j]=new Array();$(column).find('a').each(function(k,sublink){linkArray[i][j][k]=sublink;$(sublink).data({coordinate:[i,j,k]});});});});$('.tb-megamenu').find('a').focus(function(){curPos=$(this).data('coordinate');});if(navParent!==null){navParent.addEventListener('keydown',keydownEvent);}
function keydownEvent(k){switch(k.keyCode){case 9:k.preventDefault();nav_tab(k);break;case 13:nav_open_link();break;case 27:nav_esc();break;case 37:k.preventDefault();nav_left();break;case 38:k.preventDefault();nav_up();break;case 39:k.preventDefault();nav_right();break;case 40:k.preventDefault();nav_down();break;case 36:nav_home();break;case 35:nav_end();break;default:}}
function nav_tab(k){if(nav_is_toplink()){if(k.shiftKey){nav_prev_toplink();}else{nav_next_toplink();}}else{if(k.shiftKey){nav_up();}else{nav_down();}}}
function nav_open_link(){linkArray[curPos[0]][curPos[1]][curPos[2]].click();}
function nav_esc(){nav_close_megamenu();}
function nav_left(){if(nav_is_toplink()){nav_prev_toplink();}else{nav_prev_column();}}
function nav_right(){if(nav_is_toplink()){nav_next_toplink();}else{nav_next_column();}}
function nav_up(){if(nav_is_toplink()){nav_prev_toplink();}else{if(linkArray[curPos[0]][curPos[1]][curPos[2]-1]){linkArray[curPos[0]][curPos[1]][curPos[2]-1].focus();}else{nav_prev_column();}}}
function nav_down(){if(nav_is_toplink()){nav_next_column();}else{if(linkArray[curPos[0]][curPos[1]][curPos[2]+1]){linkArray[curPos[0]][curPos[1]][curPos[2]+1].focus();}else{nav_next_column();}}}
function nav_home(){if(nav_is_toplink()){linkArray[0][-1].focus();}else{linkArray[curPos[0]][0][0].focus();}}
function nav_end(){if(nav_is_toplink()){linkArray.slice(-1)[0][-1].focus();}else{linkArray[curPos[0]].slice(-1)[0].slice(-1)[0].focus();}}
function nav_is_toplink(){return(curPos[1]<0);}
function nav_close_megamenu(){$('.tb-megamenu .open').removeClass('open');$('.tb-megamenu-item.dropdown-submenu.open').removeClass('open');ariaCheck();}
function nav_next_toplink(){if(linkArray[curPos[0]+1]){linkArray[curPos[0]+1][-1].focus();}else{nav_close_megamenu();Drupal.TBMegaMenu.focusNextPrevElement('next');}}
function nav_prev_toplink(){if(linkArray[curPos[0]-1]){linkArray[curPos[0]-1][-1].focus();}else{Drupal.TBMegaMenu.focusNextPrevElement('prev');}}
function nav_prev_column(){if(linkArray[curPos[0]][curPos[1]-1][0]){linkArray[curPos[0]][curPos[1]-1][0].focus();}else{nav_parent_toplink();}}
function nav_next_column(){if(linkArray[curPos[0]][curPos[1]+1]){linkArray[curPos[0]][curPos[1]+1][0].focus();}else{nav_parent_toplink();}}
function nav_parent_toplink(){linkArray[curPos[0]][-1].focus();}
var ariaCheck=function(){$("li.tb-megamenu-item").each(function(){if($(this).is('.mega-group')){if(!$(this).parents().is('.open')){$(this).children().attr('aria-expanded','false');}
else if($(this).parents().is('.open')){$(this).children().attr('aria-expanded','true');}}
else if($(this).is('.dropdown')||$(this).is('.dropdown-submenu')){if(!$(this).is('.open')){$(this).children().attr('aria-expanded','false');}
else if($(this).is('.open')){$(this).children().attr('aria-expanded','true');}}
else{$(this).children().removeAttr('aria-expanded');}});};var showMenu=function($subMenu,mm_timeout){if($subMenu.hasClass('mega')){$subMenu.addClass('animating');clearTimeout($subMenu.data('animatingTimeout'));$subMenu.data('animatingTimeout',setTimeout(function(){$subMenu.removeClass('animating')},mm_timeout));clearTimeout($subMenu.data('hoverTimeout'));$subMenu.data('hoverTimeout',setTimeout(function(){$subMenu.addClass('open');ariaCheck();},100));}
else{clearTimeout($subMenu.data('hoverTimeout'));$subMenu.data('hoverTimeout',setTimeout(function(){$subMenu.addClass('open');ariaCheck();},100));}};var hideMenu=function($subMenu,mm_timeout){$subMenu.children('.dropdown-toggle').attr('aria-expanded','false');if($subMenu.hasClass('mega')){$subMenu.addClass('animating');clearTimeout($subMenu.data('animatingTimeout'));$subMenu.data('animatingTimeout',setTimeout(function(){$subMenu.removeClass('animating')},mm_timeout));clearTimeout($subMenu.data('hoverTimeout'));$subMenu.data('hoverTimeout',setTimeout(function(){$subMenu.removeClass('open');ariaCheck();},100));}
else{clearTimeout($subMenu.data('hoverTimeout'));$subMenu.data('hoverTimeout',setTimeout(function(){$subMenu.removeClass('open');ariaCheck();},100));}};$('.tb-megamenu-button',context).once('menuIstance',function(){var This=this;$(This).click(function(){if(parseInt($(this).parent().children('.nav-collapse').height())){$(this).parent().children('.nav-collapse').css({height:0,overflow:'hidden'});Drupal.TBMegaMenu.displayedMenuMobile=false;}
else{$(this).parent().children('.nav-collapse').css({height:'auto',overflow:'visible'});Drupal.TBMegaMenu.displayedMenuMobile=true;}});});var isTouch=window.matchMedia('(pointer: coarse)').matches;if(!isTouch){$(document).ready(function($){var mm_duration=0;$('.tb-megamenu',context).each(function(){if($(this).data('duration')){mm_duration=$(this).data('duration');}});var mm_timeout=mm_duration?100+mm_duration:500;$('.nav > li, li.mega',context).bind('mouseenter',function(event){showMenu($(this),mm_timeout);});$('.nav > li > .dropdown-toggle, li.mega > .dropdown-toggle',context).bind('focus',function(event){var $this=$(this);var $subMenu=$this.closest('li');showMenu($subMenu,mm_timeout);$(document).bind('focusin',function(event){if($subMenu.has(event.target).length){return;}
$(document).unbind(event);hideMenu($subMenu,mm_timeout);});});$('.nav > li, li.mega',context).bind('mouseleave',function(event){hideMenu($(this),mm_timeout);});});$('a').focus(function(event){if(!$(this).parent().hasClass('tb-megamenu-item')&&!$(this).parents('.tb-megamenu-block').length){nav_close_megamenu();}});$('.nav > li > a, li.mega > a').focus(function(event){var siblings=$(this).parents('.tb-megamenu-item').siblings();$.each(siblings,function(i,v){var cousins=$(v).find('.open');$.each(cousins,function(index,value){$(value).removeClass('open');ariaCheck($(this));});$(v).removeClass('open');ariaCheck();});if($(this).next(".tb-megamenu-submenu").length>0){if(!$(this).parent().hasClass("open")){$(this).parent().addClass("open");}}
if(!$(this).closest('.tb-megamenu-item.dropdown').hasClass('open')&&$(this).closest('.tb-megamenu-item.dropdown').find('.tb-megamenu-submenu').length>0){$(this).closest('.tb-megamenu-item.dropdown').addClass('open');ariaCheck();}
var parents=$(this).parents('.tb-megamenu-item.dropdown-submenu');$.each(parents,function(i,v){if(!$(v).hasClass('open')){$(v).addClass('open');ariaCheck();}});});}
$(window).resize(function(){var windowWidth=window.innerWidth?window.innerWidth:$(window).width();if(windowWidth!=Drupal.TBMegaMenu.oldWindowWidth){Drupal.TBMegaMenu.oldWindowWidth=windowWidth;Drupal.TBMegaMenu.menuResponsive();}});});},}})(jQuery);;Drupal.TBMegaMenu=Drupal.TBMegaMenu||{};(function($){Drupal.TBMegaMenu.createTouchMenu=function(items){items.children('a, .tb_nolink').each(function(){var $item=$(this);var tbitem=$(this).parent();$item.click(function(event){if($item.hasClass('tb-megamenu-clicked')){var $uri=$item.attr('href');if($uri&&$uri!=='#'){window.location.href=$uri;}}
else{event.preventDefault();$item.addClass('tb-megamenu-clicked');if(!tbitem.hasClass('open')){tbitem.addClass('open');}
tbitem.siblings('.open').find('.tb-megamenu-clicked').removeClass('tb-megamenu-clicked');tbitem.siblings('.open').removeClass('open');$('body').addClass('tb-megamenu-open');}});});}
Drupal.TBMegaMenu.eventStopPropagation=function(event){if(event.stopPropagation){event.stopPropagation();}
else if(window.event){window.event.cancelBubble=true;}}
Drupal.behaviors.tbMegaMenuTouchAction={attach:function(context){var isTouch=window.matchMedia('(pointer: coarse)').matches;if(isTouch){$('html').addClass('touch');Drupal.TBMegaMenu.createTouchMenu($('.tb-megamenu ul.nav li.mega').has('.dropdown-menu'));$(document).on('touchstart',function(event){if($('body').hasClass('tb-megamenu-open')&&!$(event.target).closest('.mega.open').length){$('.tb-megamenu ul.nav li.mega a, .tb-megamenu ul.nav li.mega .tb_nolink').removeClass('tb-megamenu-clicked');$('.tb-megamenu ul.nav li.mega').removeClass('open');$('body').removeClass('tb-megamenu-open');}});}}}})(jQuery);;(function($){Drupal.behaviors.CToolsAutoSubmit={attach:function(context){function triggerSubmit(e){if($.contains(document.body,this)){var $this=$(this);if(!$this.hasClass('ctools-ajaxing')){$this.find('.ctools-auto-submit-click').click();}}}
$('form.ctools-auto-submit-full-form',context).add('.ctools-auto-submit',context).filter('form, select, input:not(:text, :submit)').once('ctools-auto-submit').change(function(e){if($(e.target).is(':not(:text, :submit, .ctools-auto-submit-exclude)')){triggerSubmit.call(e.target.form);}});var discardKeyCode=[16,17,18,20,33,34,35,36,37,38,39,40,9,13,27];$('.ctools-auto-submit-full-form input:text, input:text.ctools-auto-submit',context).filter(':not(.ctools-auto-submit-exclude)').once('ctools-auto-submit',function(){var timeoutID=0;$(this).bind('keydown keyup',function(e){if($.inArray(e.keyCode,discardKeyCode)===-1){timeoutID&&clearTimeout(timeoutID);}}).keyup(function(e){if($.inArray(e.keyCode,discardKeyCode)===-1){timeoutID=setTimeout($.proxy(triggerSubmit,this.form),500);}}).bind('change',function(e){if($.inArray(e.keyCode,discardKeyCode)===-1){timeoutID=setTimeout($.proxy(triggerSubmit,this.form),500);}});});}}})(jQuery);;;