<?php
function wv_get_carrusel_instituciones($request) {
    $response = array();
    $instituciones = get_field('carrusel_instituciones', 'option'); 

    if ($instituciones) {
        foreach ($instituciones as $institucion) {
            $response[] = array(
                'imgDefault' => $institucion['logo_institucion'] ?? '', 
                'imgHover' => $institucion['logo_hover_institucion'] ?? '', 
                'width' => $institucion['width'] ?? 200, 
                'url' => $institucion['link_institucion'] ?? '#', 
            );
        }
    }

    return rest_ensure_response($response);
}


// endpoint 

// array(
//   'path' => '/carrusel-instituciones',
//   'method' => 'GET',
//   'callback' => 'wv_get_carrusel_instituciones',
//   'controller' => 'pages/page-carrusel-controller.php'
// ),