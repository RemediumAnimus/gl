$(document).ready(function() {
    (function(){

        var loaded = false;

        function loadData(res) {
            var data = {
                'date': res.date || '',
                'title': res.title || '',
                'preview': res.preview || '',
                'url': res.url || '',
                'image': res.image || ''
            };

            if (data.image) {
                var template = '<div class="n-item">'+
                                    '<a href='+ data.url +'></a>'+
                                    '<div class="n-item__pic">'+
                                        '<img src='+ data.image + ' alt="">' +
                                    '</div>'+
                                    '<div class="n-item__info">'+
                                        '<div class="n-item__date">'+ data.date +'</div>'+
                                        '<div class="n-item__head">'+ data.title +'.</div>'+
                                        '<div class="n-item__text">'+ data.preview + '</div>'+
                                    '</div>'+
                                '</div>'
            } else {
                var template = '<div class="n-item">'+
                                    '<a href='+ data.url +'></a>'+
                                    '<div class="n-item__info">'+
                                        '<div class="n-item__date">'+ data.date +'</div>'+
                                        '<div class="n-item__head">'+ data.title +'.</div>'+
                                        '<div class="n-item__text">'+ data.preview + '</div>'+
                                    '</div>'+
                                '</div>'
            }
            return template;
        }

        $('.n-link').click(function(e){
            e.preventDefault();
            var link = $(this).attr('href');
            $('html, body').stop().animate({
              scrollTop: $(link).offset().top
            }, 1000);
        })

        $('.load').click(function(){
            if (loaded) return;
            var $that = $(this);
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'news.json', true);
            xhr.send();

            xhr.onreadystatechange = function() {

              if (xhr.readyState != 4) return;

              if (xhr.status != 200) {
                  console.log(xhr.status + ': ' + xhr.statusText);
              } else {
                  var res = JSON.parse(xhr.responseText);
                  for (var i=0; i<res.news.length; i++) {
                      var elem = loadData(res.news[i]);
                      $('.n-items').append(elem);
                  }
                  $that.hide();
                  loaded = true;
              }

            }
        });

        $('.open-pop').click(function(e){
            e.preventDefault();
            $.magnificPopup.open({
                items: {
                    src: '#pop-alarm'
                },
                type: 'inline',
                fixedContentPos: true,
                fixedBgPos: true,
                overflowY: 'auto',
                closeOnBgClick: true,
                closeBtnInside: true,
                preloader: false,
                closeMarkup: '',
                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-slide-bottom',
            });
        });

        $('.n-pop__close').click(function(){
            $.magnificPopup.close();
        });

        $('#tel').inputmask({"mask": "9(999) 999-9999"});
        $('#email').inputmask({
            mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
            greedy: false,
            onBeforePaste: function (pastedValue, opts) {
              pastedValue = pastedValue.toLowerCase();
              return pastedValue.replace("mailto:", "");
            },
            definitions: {
              '*': {
                validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
                cardinality: 1,
                casing: "lower"
              }
            }
        });
        $('#form').validate({
            rules: {
                name: "required",
                message: "required",
                tel: {
                    required: function(element) {
                        if ($("#email").val()) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                },
                email: {
                     required: function(element) {
                        if ($("#tel").val()) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                },
            },
            messages: {
                name: 'Введите имя',
                message: "Введите сообщение",
                email: "Введите email",
                tel: "Введите номер телефона"
            },
            submitHandler: function(form) {
                $.ajax({
                    type: 'GET',
                    url: 'success.json',
                    data: $('#form').serialize(),
                    success: function(res) {
                        //var obj = JSON.parse(res);
                        $('.n-resH').html(res.msg);
                        console.log(res);
                        $.magnificPopup.close();
                        setTimeout(function(){
                            $.magnificPopup.open({
                                items: {
                                    src: '#pop-res'
                                },
                                type: 'inline',
                                fixedContentPos: true,
                                fixedBgPos: true,
                                overflowY: 'auto',
                                closeOnBgClick: true,
                                closeBtnInside: true,
                                preloader: false,
                                closeMarkup: '',
                                midClick: true,
                                removalDelay: 300,
                                mainClass: 'my-mfp-slide-bottom',
                            });
                        },1000)
                    }
                })
            }
        });
    })();
});