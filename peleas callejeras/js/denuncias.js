function addComplaint(form) {
    var $form = $(form);
    var data = {};
    $form.find('[name]').each(function(idx, input) {
        var $input = $(input);
        data[$input.attr('name')] = $input.val();
    });
    $.ajax({
        crossDomain: true,
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'https://api.parse.com/1/classes/Complaints',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-Parse-Application-Id', 'HPjhF9QBvFKLXN4uzPXtZVhyvg21LQXpvduvtZ43');
            xhr.setRequestHeader('X-Parse-REST-API-Key', '2HIWhWpeg64Ij85pJtF1mOyoe3sUejHTM7KL0NpG')
        },
        method: 'POST',
        success: function(response) {
            $form.find('[name]').val('');
            $.each(data, function(prop, value) {
                response[prop] = value;
            });
            addPanel(response);
        }
    });
    return false;
}

function loadComplaints() {
    $.ajax({
        crossDomain: true,
        url: 'https://api.parse.com/1/classes/Complaints?order=-createdAt',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-Parse-Application-Id', 'HPjhF9QBvFKLXN4uzPXtZVhyvg21LQXpvduvtZ43');
            xhr.setRequestHeader('X-Parse-REST-API-Key', '2HIWhWpeg64Ij85pJtF1mOyoe3sUejHTM7KL0NpG')
        },
        method: 'GET',
        success: function(response) {
            for (var i = 0, len = response.results.length; i < len; i++) {
                var complaint = response.results[i];
                addPanel(complaint);
            }
        }
    });
}

function addPanel(complaint) {
    var $panel = $('\
        <div class="denuncia"> \
            <span class="autor">' + complaint.first_name + '</span> \
            <span class="lugar">' + complaint.location + '</span> \
            <span class="fechahora">' + formatDate(complaint.createdAt) + '</span> \
            <p class="descripcion">' + complaint.content + '</p> \
        </div>');
    $panel.hide().insertAfter('#formulario').fadeIn({
        duration: 'slow',
        queue: true
    });
}

function formatDate(date) {
    var tmp = new Date(date);
    return tmp.toLocaleTimeString();
}