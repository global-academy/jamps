function loadComplaints() {
    $.ajax({
        crossDomain: true,
        url: 'https://api.parse.com/1/classes/Report?order=-createdAt',
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
            <img class="foto" src="'+(complaint.imagen?complaint.imagen.url:'../img/imagen_no_disponible.png')+'" alt="" /> \
            <b class="descripcion">' + complaint.tipo + '</b> \
            <span class="lugar">' + complaint.comentario + '</span> \
            <small><span class="fechahora">' + formatDate(complaint.createdAt) + '</span></small> \
        </div>');
    $panel.hide().appendTo('.contenedor').fadeIn({
        duration: 'slow',
        queue: true
    });
}

function formatDate(date) {
    var tmp = new Date(date);
    return tmp.toLocaleDateString()+', '+tmp.toLocaleTimeString();
}