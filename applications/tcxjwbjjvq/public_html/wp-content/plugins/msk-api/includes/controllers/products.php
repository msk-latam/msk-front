<?php

if ( ! defined('ABSPATH') ) exit;

/**
 * Registra la ruta REST para obtener productos.
 */
function msk_register_products_routes() {
    register_rest_route('msk/v1', '/products', [
        'methods'             => 'GET',
        'callback'            => 'msk_handle_get_products',
        'permission_callback' => '__return_true',
        'args'                => [
            'lang' => [
                'description'       => 'Código de idioma (ej: es, en)',
                'sanitize_callback' => 'sanitize_text_field',
            ],
            'page' => [
                'description'       => 'Número de página',
                'sanitize_callback' => 'absint',
                'default'           => 1,
            ],
            'per_page' => [
                'description'       => 'Cantidad por página',
                'sanitize_callback' => 'absint',
                'default'           => 12,
            ],
            'search' => [
                'description'       => 'Buscar',
                'sanitize_callback' => 'sanitize_text_field',
                'default'           => '',
            ],
            'order' => [
                'description'       => 'Ordenar por (ASC o DESC). Usado con price y date.',
                'sanitize_callback' => 'sanitize_text_field',
                'default'           => 'desc',
            ],
            'orderby' => [
                'description'       => "Ordenar por: 'relevance' (defecto), 'price-asc', 'price-desc', 'date'.",
                'sanitize_callback' => 'sanitize_text_field',
                'default'           => 'relevance', // Changed default from 'date' to 'relevance'
            ],
            'specialty' => [
                'description'       => 'Especialidad',
                'sanitize_callback' => 'sanitize_text_field',
            ],
            'profession' => [
                'description'       => 'Profesión',
                'sanitize_callback' => 'sanitize_text_field',
            ],
            'duration' => [
                'description'       => 'Duración',
                'sanitize_callback' => 'sanitize_text_field',
            ],
            'resource' => [
                'description'       => 'Recurso',
                'sanitize_callback' => 'sanitize_text_field',
            ],
        ],
    ]);
}

function msk_handle_get_products( WP_REST_Request $request ) {
    $lang      = $request->get_param('lang') ?: 'int';
    $page      = $request->get_param('page') ?: 1;
    $per_page  = $request->get_param('per_page') ?: 12;
    $search    = $request->get_param('search') ?: '';
    $order_param     = $request->get_param('order') ?: 'desc';      // Renamed from $order for clarity
    $orderby_param   = $request->get_param('orderby') ?: 'relevance'; // Renamed from $orderby, new default relevance
    $specialty = $request->get_param('specialty') ?: '';
    $profession = $request->get_param('profession') ?: '';
    $duration = $request->get_param('duration') ?: '';
    $resource = $request->get_param('resource') ?: '';

    msk_set_switch_language($lang);

    // Cache key - updated to use new param names for consistency in cache key
    $params     = ['lang' => $lang, 'page' => $page, 'per_page' => $per_page, 'search' => $search, 'order' => $order_param, 'orderby' => $orderby_param, 'specialty' => $specialty, 'profession' => $profession, 'duration' => $duration, 'resource' => $resource];
    $cache_key  = wp_headless_build_cache_key('products', $params);
    $cached     = wp_headless_get_cache($cache_key);

    // if ( $cached ) {
    // ... existing code ...
    // --- (End Resource Filter Logic) ---
      // --- Add filter for is_test_product and hidden_product ---
    $meta_query_args[] = [
        'relation' => 'OR',
    // ... existing code ...
    // --- (End Final Check) ---


    $query_args = [
        'post_type'      => 'product',
        'post_status'    => 'publish',
        'posts_per_page' => $per_page,
        'paged'          => $page,
        's'              => $search,
        // 'orderby', 'order', and 'meta_key' will be set by the new logic below
        'tax_query'      => $tax_query_args,
        // 'meta_query' will be assigned after sorting logic
    ];

    // --- Sorting Logic ---
    if ($orderby_param === 'relevance') {
        // These named clauses are for sorting. ACF booleans are '1' or '0'/null.
        // 'type' => 'NUMERIC' allows correct DESC sorting ('1' before '0'/null).
        // 'compare' => 'EXISTS' ensures the key is considered for sorting.
        $meta_query_args['relevance_presale'] = [
            'key' => 'is_presale_product',
            'type' => 'NUMERIC',
            'compare' => 'EXISTS',
        ];
        $meta_query_args['relevance_highlighted'] = [
            'key' => 'highlighted_product',
            'type' => 'NUMERIC',
            'compare' => 'EXISTS',
        ];
        $meta_query_args['relevance_hotsale'] = [
            'key' => 'hotsale',
            'type' => 'NUMERIC',
            'compare' => 'EXISTS',
        ];
        $meta_query_args['relevance_bestseller'] = [
            'key' => 'curso_best_seller',
            'type' => 'NUMERIC',
            'compare' => 'EXISTS',
        ];

        $query_args['orderby'] = [
            'relevance_presale'     => 'DESC',
            'relevance_highlighted' => 'DESC',
            'relevance_hotsale'     => 'DESC',
            'relevance_bestseller'  => 'DESC',
            'date'                  => 'DESC', // Fallback to newest
        ];
        // $query_args['order'] is not strictly needed here as directions are in the 'orderby' array.
    } elseif ($orderby_param === 'price-asc') {
        $query_args['meta_key'] = '_price'; // Standard WooCommerce price meta key
        $query_args['orderby']  = 'meta_value_num';
        $query_args['order']    = 'ASC';
    } elseif ($orderby_param === 'price-desc') {
        $query_args['meta_key'] = '_price';
        $query_args['orderby']  = 'meta_value_num';
        $query_args['order']    = 'DESC';
    } elseif ($orderby_param === 'date') { // For "newest"
        $query_args['orderby'] = 'date';
        $query_args['order']   = $order_param; // Use 'ASC' or 'DESC' from request
    } else {
        // Fallback for any unexpected orderby_param, defaults to date DESC.
        $query_args['orderby'] = 'date';
        $query_args['order']   = 'DESC';
    }

    // Assign the fully constructed meta_query to the query_args
    $query_args['meta_query'] = $meta_query_args;

    // --- Debugging ---
    // error_log('WP_Query Args: ' . print_r($query_args, true));
    // ... existing code ...
            'order'     => $order_param,
            'orderby'   => $orderby_param,
            'specialty' => $specialty,
            'profession' => $profession,
    // ... existing code ...

    // ... existing code ...
}

// ... existing code ...

// ... existing code ...
