{*Пример открытия формы при загрузке сайта раз в две недели.*}
{literal}
<script type="text/javascript">
    $(document).ready(function(){
        function readCookie(name) {
            var name_cook = name + "=";
            var spl = document.cookie.split(';');
            for(var i=0; i<spl.length; i++) {
                var c = spl[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1, c.length);
                }
                if(c.indexOf(name_cook) == 0) {
                    return c.substring(name_cook.length, c.length);
                }
            }
            return null;
        }
        var value_cookie = readCookie("__available_date");
        if (Date.now() > value_cookie) {
            setTimeout(function () {
                $.fancybox.open({
                    src  : '{/literal}{$SITE_URL}{literal}forms/show/newsletter/?ajax=true',
                    type : 'ajax',
                    opts : {
                        afterShow : function( instance, current ) {
                            $.cookie('__available_date', Date.now() +  + 1209600000, {path: '/'})
                        }
                    }
                });
            }, 4000);
        }
    });
</script>
{/literal}