
$(function(){
    setElm = $('.fullSlider');
    slideSpeed = 500;
    switchDelay = 5000;
    easing = 'linear';
    sideNavi = 'on'; // 'on' or 'off'
    sideHide = 'hide'; // 'hide' or 'show'
    autoPlay = '1'; // notAutoPlay = '0'
    naviOpc = 0.5;
    pnOpacity = 0.5;
 
    ua = navigator.userAgent;
 
    $(window).load(function(){
        setElm.each(function(){
            targetObj = $(this);
            targetObj.children('ul').wrapAll('<div class="fullViewWrap"></div>');
            var findWrap = targetObj.find('.fullViewWrap');
 
            var baseList = findWrap.find('li'),
            baseListLink = findWrap.find('li').children('a'),
            baseListCount = findWrap.find('li').length;
 
            baseList.each(function(i){
                $(this).attr('class','viewList' + (i + 1).toString());
            });
 
            if(baseListCount > 1){
                // ページネーションSET
                var pagination = $('<div class="pagiNation"></div>');
                targetObj.append(pagination);
 
                baseList.each(function(i){
                    pagination.append('<a href="javascript:void(0);" class="pn'+(i+1)+'"></a>');
                });
 
                var pnPoint = pagination.children('a'),
                pnFirst = pagination.children('a:first'),
                pnLast = pagination.children('a:last'),
                pnCount = pagination.children('a').length;
 
                if(ua.search(/iPhone/) != -1 || ua.search(/iPad/) != -1 || ua.search(/iPod/) != -1 || ua.search(/Android/) != -1){
                    pnPoint.css({opacity:pnOpacity});
                } else {
                    pnPoint.css({opacity:pnOpacity}).hover(function(){
                        $(this).stop().animate({opacity:'1'},300);
                    }, function(){
                        $(this).stop().animate({opacity:(pnOpacity)},300);
                    });
                }
 
                pnFirst.addClass('pnActive');
                pnPoint.click(function(){
                    if(autoPlay == '1'){clearInterval(setAutoTimer);}
                    var setNum = pnPoint.index(this),
                    moveLeft = ((wdWidth)*(setNum))+baseWrapWidth;
                    findWrap.stop().animate({left: -(moveLeft)},slideSpeed,easing);
                    pnPoint.removeClass('pnActive');
                    $(this).addClass('pnActive');
                    activePos();
                    if(autoPlay == '1'){slideTimer();}
                });
 
                function activePos(){
                    var posActive = pagination.find('.pnActive');
                    posActive.each(function(){
                        var posIndex = pnPoint.index(this),
                        setMainList = findWrap.find('.mainList').children('li');
                        setMainList.removeClass('mainActive').eq(posIndex).addClass('mainActive');
                    });
                }
                function pnActiveMoveNext(){
                    var pnPointActive = pagination.children('.pnActive');
                    pnPointActive.each(function(){
                        var pnIndex = pnPoint.index(this),
                        listCount = pnIndex+1;
                        if(pnCount == listCount){
                            pnPointActive.removeClass('pnActive');
                            pnFirst.addClass('pnActive');
                        } else {
                            pnPointActive.removeClass('pnActive').next().addClass('pnActive');
                        }
                    });
                }
                function pnActiveMovePrev(){
                    var pnPointActive = pagination.children('.pnActive');
                    pnPointActive.each(function(){
                        var pnIndex = pnPoint.index(this),
                        listCount = pnIndex+1;
                        if(1 == listCount){
                            pnPointActive.removeClass('pnActive');
                            pnLast.addClass('pnActive');
                        } else {
                            pnPointActive.removeClass('pnActive').prev().addClass('pnActive');
                        }
                    });
                }
 
                // ボタン移動動作
                function switchNext(){
                    findWrap.not(':animated').each(function(){
                        if(autoPlay == '1'){clearInterval(setAutoTimer);}
                        var posLeft = parseInt($(findWrap).css('left')),
                        moveLeft = ((posLeft)-(wdWidth));
                        findWrap.stop().animate({left:(moveLeft)},slideSpeed,easing,function(){
                            var adjustLeft = parseInt($(findWrap).css('left'));
                            if(adjustLeft <= posResetNext){
                                findWrap.css({left: -(baseWrapWidth)});
                            }
                        });
                        pnActiveMoveNext();
                        activePos();
                        if(autoPlay == '1'){slideTimer();}
                    });
                }
                function switchPrev(){
                    findWrap.not(':animated').each(function(){
                        if(autoPlay == '1'){clearInterval(setAutoTimer);}
 
                        var posLeft = parseInt($(findWrap).css('left')),
                        moveLeft = ((posLeft)+(wdWidth));
                        findWrap.stop().animate({left:(moveLeft)},slideSpeed,easing,function(){
                            var adjustLeft = parseInt($(findWrap).css('left')),
                            adjustLeftPrev = (posResetNext)+(wdWidth);
                            if(adjustLeft >= posResetPrev){
                                findWrap.css({left: adjustLeftPrev});
                            }
                        });
                        pnActiveMovePrev();
                        activePos();
                        if(autoPlay == '1'){slideTimer();}
                    });
                }
 
                function slideTimer(){
                    setAutoTimer = setInterval(function(){
                        switchNext();
                    },switchDelay);
                }
                if(autoPlay == '1'){slideTimer();}
 
                // サイドナビボタン（有り無し）
                if(sideNavi == 'on'){
                    targetObj.append('<a href="javascript:void(0);" class="btnPrev"></a><a href="javascript:void(0);" class="btnNext"></a>');
                    var btnPrev = targetObj.find('.btnPrev'),btnNext = targetObj.find('.btnNext'),btnPrevNext = targetObj.find('.btnPrev,.btnNext');
 
                    if(ua.search(/iPhone/) != -1 || ua.search(/iPad/) != -1 || ua.search(/iPod/) != -1 || ua.search(/Android/) != -1){
                        btnPrevNext.css({opacity:naviOpc});
                    } else {
                        btnPrevNext.css({opacity:naviOpc}).hover(function(){
                            $(this).stop().animate({opacity:'1'},200);
                        },function(){
                            $(this).stop().animate({opacity:naviOpc},200);
                        });
                    }
 
                    if(sideHide == 'hide'){
                        if(ua.search(/iPhone/) != -1 || ua.search(/iPad/) != -1 || ua.search(/iPod/) != -1 || ua.search(/Android/) != -1){
                            btnPrevNext.css({visibility:'visible'});
                        } else {
                            btnPrevNext.css({visibility:'hidden'});
                            targetObj.hover(function(){
                                btnPrevNext.css({visibility:'visible'});
                            },function(){
                                btnPrevNext.css({visibility:'hidden'});
                            });
                        }
                    }
 
                    btnPrev.click(function(){switchPrev();});
                    btnNext.click(function(){switchNext();});
                }
 
                // 画像フルスクリーン調整
                var stretchImg = findWrap.find('img'),
                imgWidth = stretchImg.width(),
                imgHeight = stretchImg.height(),
                selfWH = imgWidth / imgHeight;
 
                // フルスクリーン（レスポンシブ）動作
                function setSlide(){
                    wdWidth = $(window).width();
                    wdHeight = $(window).height();
                    findLi = findWrap.find('li');
 
                    setWrapLeft = parseInt(findWrap.css('left'));
                    setlistWidth = findLi.width();
                    setLeft = setWrapLeft / setlistWidth;
 
                    setElm.css({height:wdHeight});
                    findLi.css({width:wdWidth,height:wdHeight});
 
                    baseWrapWidth = wdWidth*baseListCount;
 
                    ulCount = findWrap.find('ul').length;
                    if(ulCount == 1){
                        var makeClone = findWrap.children('ul');
                        makeClone.clone().prependTo(findWrap);
                        makeClone.clone().appendTo(findWrap);
                        findWrap.children('ul').eq('1').addClass('mainList');
                        var mainList = findWrap.find('.mainList').children('li');
                        mainList.eq('0').addClass('mainActive');
 
                        allListCount = findWrap.find('li').length;
                    }
                    allLWrapWidth = wdWidth*allListCount;
                    posAdjust = ((wdWidth)-(wdWidth))/2;
 
                    findWrap.css({width:allLWrapWidth,height:wdHeight});
                    findWrap.children('ul').css({width:baseWrapWidth,height:wdHeight});
 
                    var stretchImg = findLi.find('img');
                    posResetNext = -(baseWrapWidth)*2;
                    posResetPrev = -(baseWrapWidth)+(wdWidth);
 
                    adjLeft = wdWidth * setLeft;
                    findWrap.css({left:adjLeft});
 
                    // 画像フルスクリーン調整
                    var strWidth = $(window).width(),
                    strHeight = $(window).height(),
                    calHeight = strWidth / selfWH;
                    if(calHeight < $(window).height()){
                        calHeight = $(window).height();
                        strWidth = calHeight * selfWH;
                    }
                    stretchImg.css({marginTop:-calHeight/2,marginLeft:-strWidth/2,width:strWidth,height:calHeight});
                }
                setSlide();
 
                $(window).on('resize',function(){
                    if(autoPlay == '1'){clearInterval(setAutoTimer);}
                    setSlide();
                    if(autoPlay == '1'){slideTimer();}
                }).resize();
 
                findWrap.css({left:-(baseWrapWidth)});
            }
            $('body').css({opacity:'0',visibility:'visible'}).stop().animate({opacity:'1'},1000);
        });
    });
});
