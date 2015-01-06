title: PHP风险函数
date: 2013-10-05 16:54:26
tags:
- security
- php

---

> PHP函数非常多，但是使用不当会造成危险。以下列出PHP中存在风险的函数，可以用作PHP代码安全审计！

<!-- more -->

命令执行：

|函数|解释|
|-|-|
|exec|不输出但返回结果最后一行，第二个参数储存全部结果|
|passthru|输出不返回结果|
|system|返回并输出结果|
|shell_exec|返回但不输出结果|
|``|反引号，作用同shell_exec|
|popen|执行命令返回资源号|
|proc_open|同popen，更高权限|
|pcntl_exec|执行程序|

代码执行：

|函数|解释|
|-|-|
|eval|执行代码|
|assert|判断表达式是否成立|
|preg_replace|带/e修正符时，第二个参数将被当作代码执行|
|create_function|创建一个函数运行|
|include|能引用远程代码|
|include_once|能引用远程代码|
|require|能引用远程代码|
|require_once|能引用远程代码|
|$_GET['func']\($_GET['param'])|执行函数|

函数调用：

|函数|调用参数位置|
|-|-|
|ob_start|0|
|array_diff_uassoc|-1|
|array_diff_ukey|-1|
|array_filter|1|
|array_intersect_uassoc|-1|
|array_intersect_ukey|-1|
|array_map|0|
|array_reduce|1|
|array_udiff_assoc|-1|
|array_udiff_uassoc|-1, -2|
|array_udiff|-1|
|array_uintersect_assoc|-1|
|array_uintersect_uassoc|-1, -2|
|array_uintersect| -1|
|array_walk_recursive|1|
|array_walk|1|
|assert_options|1|
|uasort|1|
|uksort|1|
|usort|1|
|preg_replace_callback|1|
|spl_autoload_register|0|
|iterator_apply|1|
|call_user_func|0|
|call_user_func_array|0|
|register_shutdown_function|0|
|register_tick_function|0|
|set_error_handler|0|
|set_exception_handler|0|
|session_set_save_handler|0, 1, 2, 3, 4, 5|
|sqlite_create_aggregate|2, 3|
|sqlite_create_function|2|

信息泄漏：

|函数|说明|
|-|-|
|phpinfo|PHP配置信息|
|posix_mkfifo|检查某目录是否是当前用户所有|
|posix_getlogin|获取登陆用户名|
|posix_ttyname|获取控制台名称|
|getenv|获取环境变量|
|get_current_user|获取当前用户|
|proc_get_status|获取proc_open信息|
|get_cfg_var|获取PHP配置|
|disk_free_space|获取硬盘可用空间|
|disk_total_space|获取硬盘总空间|
|diskfreespace|同disk_free_space|
|getcwd|获取当前活动目录|
|getlastmod|获取最后修改时间|
|getmygid|获取脚本GroupID|
|getmyinode|获取当前脚本inode|
|getmypid|获取PHP线程ID|
|getmyuid|获取当前脚本UID|

文件操作：

|函数|备注|
|-|-|
|fopen||
|tmpfile||
|bzopen||
|gzopen||
|SplFileObject||
|||
|chgrp||
|chmod||
|chown||
|copy||
|file_put_contents||
|lchgrp||
|lchown||
|link||
|mkdir||
|move_uploaded_file||
|rename||
|rmdir||
|symlink||
|tempnam||
|touch||
|unlink||
|imagepng|第二个参数是路径|
|imagewbmp|第二个参数是路径|
|image2wbmp|第二个参数是路径|
|imagejpeg|第二个参数是路径|
|imagexbm|第二个参数是路径|
|imagegif|第二个参数是路径|
|imagegd|第二个参数是路径|
|imagegd2|第二个参数是路径|
|iptcembed||
|ftp_get||
|ftp_nb_get||
|||
|file_exists||
|file_get_contents||
|file||
|fileatime||
|filectime||
|filegroup||
|fileinode||
|filemtime||
|fileowner||
|fileperms||
|filesize||
|filetype||
|glob||
|is_dir||
|is_executable||
|is_file||
|is_link||
|is_readable||
|is_uploaded_file||
|is_writable||
|is_writeable||
|linkinfo||
|lstat||
|parse_ini_file||
|pathinfo||
|readfile||
|readlink||
|realpath||
|stat||
|gzfile||
|readgzfile||
|getimagesize||
|imagecreatefromgif||
|imagecreatefromjpeg||
|imagecreatefrompng||
|imagecreatefromwbmp||
|imagecreatefromxbm||
|imagecreatefromxpm||
|ftp_put||
|ftp_nb_put||
|exif_read_data||
|read_exif_data||
|exif_thumbnail||
|exif_imagetype||
|hash_file||
|hash_hmac_file||
|hash_update_file||
|md5_file||
|sha1_file||
|highlight_file||
|show_source||
|php_strip_whitespace||
|get_meta_tags||

以上函数如果要产生更大的影响需要配合以下输入型函数

|函数|描述|
|-|-|
|$_GET||
|$_POST||
|$_COOKIE||
|$_REQUEST||
|$_FILES||
|$_SERVER||
|$_ENV||
|$HTTP_GET_VARS||
|$HTTP_POST_VARS||
|$HTTP_COOKIE_VARS||
|$HTTP_REQUEST_VARS||
|$HTTP_POST_FILES||
|$HTTP_SERVER_VARS||
|$HTTP_ENV_VARS||
|$HTTP_RAW_POST_DATA||
|$argv||
|$argc||
|get_headers||
|runkit_superglobals||
|import_request_variables||

系统常量

|常量|解释|
|-|-|
|HTTP_ACCEPT||
|HTTP_ACCEPT_LANGUAGE||
|HTTP_ACCEPT_ENCODING||
|HTTP_ACCEPT_CHARSET||
|HTTP_CONNECTION||
|HTTP_HOST||
|HTTP_KEEP_ALIVE||
|HTTP_REFERER||
|HTTP_USER_AGENT||
|HTTP_X_FORWARDED_FOR||
|PHP_AUTH_DIGEST||
|PHP_AUTH_USER||
|PHP_AUTH_PWD||
|AUTH_TYPE||
|QUERY_STRING||
|REQUEST_URI||
|PATH_INFO||
|ORIG_PATH_INFO||
|PATH_THANSLATED||
|PHP_SEFT||
