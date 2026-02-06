<?php
namespace ArtigoSults\Core;

class Plugin {
    public function run() {
        // Aqui registraremos os hooks e os carregadores de integração futuramente
        add_action('admin_notices', [$this, 'boas_vindas']);
    }

    public function boas_vindas() {
        echo '<div class="notice notice-success is-dismissible"><p>ArtigoSults Backend Ativado!</p></div>';
    }
}