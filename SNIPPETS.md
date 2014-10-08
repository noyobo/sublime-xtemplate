# Snippets List

## Html

|trigger  |description     |export                                     |
|---------|----------------|-------------------------------------------|
|lic      |`<li class=""/>`|```<li class=""></li>```                   |
|lid      |`<li id=""/>`   |```<li id=""></li>```                      |
|spm-click|`data-spm-click`|```data-spm-click="gostr=/key;locaid=d1"```|

## Kissy

|trigger|description|export                                                                          |
|-------|-----------|--------------------------------------------------------------------------------|
|k      |`kissy cdn`|```<script src="//g.alicdn.com/kissy/k/${1:1.4.7}/seed${2:-min}.js"></script>```|

## Xtemplate

|trigger|description      |export                                                                |
|-------|-----------------|----------------------------------------------------------------------|
|x-     |`{{% %}}`        |```{{%  %}}```                                                        |
|x--    |`{{% %}}`        |```{{%%}}```                                                          |
|xb     |`block ...`      |```{{{block ('body')}}}```                                            |
|xbc    |`block ... block`|```{{#block ('body')}}//code{{/block}}```                             |
|xcm    |`{{! zhu shi }}` |```{{! zhu shi }}```                                                  |
|xe     |`extend ...`     |```{{extend ('layout')}}```                                           |
|xeach  |`each...`        |```{{#each([1,2,4])}}${2:\{\{this\}\}}{{/each}}```                    |
|xi     |`include...`     |```{{include ('header'}}```                                           |
|xid    |`index`          |```{{xindex}}```                                                      |
|xif    |`if...`          |```{{#if(true)}}//code{{/if}}```                                      |
|xife   |`if...else...`   |```{{#if(x===1)}}//code{{else}}//code{{/if}}```                       |
|xiff   |`if...elseif...` |```{{#if(x===1)}}//code{{elseif(x===2)}}//code{{else}}//code{{/if}}```|
|xm     |`macro`          |```{{#macro('name',param)}}{{param}}{{/macro}}```                     |
|xmc    |`macro call`     |```{{#macro('name','variable')}}```                                   |
|xrange |`range...`       |```range(0,3)```                                                      |
|xroot  |`root`           |```{{root.name}}```                                                   |
|xs     |`set`            |```{{set(x=1)}}```                                                    |
|xthis  |`this`           |```{{this}}```                                                        |
|xw     |`with ...`       |```{{#with(obj)}}//code{{/with}}```                                   |
|xx     |`{{-}}`          |```{{}}```                                                            |
|xxx    |`{{{_}}}`        |```{{{}}}```                                                          |

