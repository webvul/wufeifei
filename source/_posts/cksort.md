title: cksort
date: 2013-02-23 13:26:50
tags:
- php

---

> 对数组某一键值进行排序

<!-- more -->

```php
/**
 * 对数组某一键值排序
 * @author Feei
 * @param $array
 * @param string $subkey
 * @param null $subkey2
 * @param bool $sort_ascending
 */
public static function cksort(&$array, $subkey = "id", $subkey2 = null ,$sort_ascending=false)
{
	if (count($array))
		$temp_array[key($array)] = array_shift($array);

	foreach($array as $key => $val){
		$offset = 0;
		$found = false;
		foreach($temp_array as $tmp_key => $tmp_val)
		{
			if(!$found and strtolower($val[$subkey]) > strtolower($tmp_val[$subkey]))
			{
				$temp_array = array_merge(
					(array)array_slice($temp_array,0,$offset), array($key => $val),
					array_slice($temp_array,$offset));
				$found = true;
			}
			elseif(!$found
				and $subkey2 and strtolower($val[$subkey]) == strtolower($tmp_val[$subkey])
				and strtolower($val[$subkey2]) > strtolower($tmp_val[$subkey2]))
			{
				$temp_array = array_merge(
					(array)array_slice($temp_array,0,$offset),
					array($key => $val), array_slice($temp_array,$offset));
				$found = true;
			}
			$offset++;
		}
		if(!$found) $temp_array = array_merge($temp_array, array($key => $val));
	}
	if ($sort_ascending) $array = array_reverse($temp_array);
	else $array = $temp_array;
}
```
