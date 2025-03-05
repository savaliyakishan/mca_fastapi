var data = []
var token = ""

jQuery(document).ready(function () {
    var slider = $('#max_words')
    slider.on('change mousemove', function (evt) {
        $('#label_max_words').text('Top k words: ' + slider.val())
    })

    var slider_mask = $('#max_words_mask')
    slider_mask.on('change mousemove', function (evt) {
        $('#label_max_words').text('Top k words: ' + slider_mask.val())
    })

    $('#input_text').on('keyup', function (e) {
        
            $.ajax({
                url: '/predict',
                type: "post",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    "text": $('#input_text').val(),
                    "predictions":5,
                    "tokens": 1,
                }),
                beforeSend: function () {
                    $('.overlay').show()
                },
                complete: function () {
                    $('.overlay').hide()
                }
            }).done(function (jsondata, textStatus, jqXHR) {
                let datalist = document.getElementById("next_world_suggestion");
                datalist.innerHTML = "";
                jsondata['words'].forEach(item => {
                    let option = document.createElement("option");
                    option.value = item.trim();  // Remove new lines and spaces
                    datalist.appendChild(option);
                });
                
            }).fail(function (jsondata, textStatus, jqXHR) {
                console.log(jsondata)
            });
        
    })
})