<?php
$progress = (time() % 50) * 2;
// return progress level in JSON format
print "{\"progress\": \"$progress\"}";
?>