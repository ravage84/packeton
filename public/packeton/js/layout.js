(function ($, humane) {
    "use strict";

    $('.view-log').on('click', function (e) {
        e.preventDefault();
        let target = $(this);
        let details = target.attr('data-details');
        let message = target.attr('data-msg');
        let close = '<a class="close">x</a>';
        if (message.length > 64) {
            if (message.length > 120) {
                details = '<pre>' + message + '</pre>' + details;
            }

            message = message.substring(0, 60) + '...';
        }

        message = message.htmlSpecialChars();
        humane.log([close, message, details], {timeout: 0});

        $('a.close').one('click', function () {
            humane.remove();
        });
    });

    $('form.onsubmit-confirm').on('submit', (e) => {
        if (!confirm('Are you sure?')) {
            e.preventDefault();
        }
    });

    /**
     * Ajax error handler
     */
    $.ajaxSetup({
        error: function (xhr) {
            let resp, message, details = '';
            humane.remove();

            message = '';
            if (xhr.responseText) {
                try {
                    resp = JSON.parse(xhr.responseText);
                    if (resp.status && resp.status === 'error') {
                        message = resp.message;
                        details = resp.details;
                    } else if (resp.error) {
                        message = resp.error;
                    }
                } catch (e) {
                    message = "We're so sorry, something is wrong on our end.";
                }
            }

            message = message.htmlSpecialChars();
            humane.log(details ? [message, details] : message, {timeout: 0, clickToClose: true});
        }
    });

    /**
     * API Token visibility toggling
     */
    let token = $('#api-token');
    token.val('');

    $('.btn-show-api-token,#api-token').each(function() {
        $(this).click(function (e) {
            token.val(token.data('api-token'));
            token.select();

            $('.btn-show-api-token').text('Your API token');
            e.preventDefault();
        });
    });

    $('.toc a').click(function (e) {
        setTimeout(function () {
            scrollTo(0, $($(e.target).attr('href')).offset().top - 65);
        }, 0);
    });

    $('[data-toggle="popover"]').popover();
})(jQuery, humane);
