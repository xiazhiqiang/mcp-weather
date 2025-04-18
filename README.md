# mcp weather server

nodejs >= 18

## 运行

```sh
npm run server:build
```

访问：http://localhost:5173/#resources

## 参考

- https://modelcontextprotocol.io/quickstart/server
- https://zhuanlan.zhihu.com/p/32199994850
- https://www.claudemcp.com/zh/docs/write-ts-server
- https://www.cnblogs.com/ghj1976/p/18790993/shi-yonginspector-diao-shimcp-fu-wu
- 天气 API：
  - https://www.free-api.com/doc/518
  - https://lbs.amap.com/api/webservice/guide/api/weatherinfo/
    - 示例：https://restapi.amap.com/v3/weather/weatherInfo?key=[API KEY]&city=110000&extensions=all
  - https://weather-gov.github.io/api/general-faqs
    - 示例：https://api.weather.gov/points/38.8894,-77.0352

## 其他 MCP 服务使用

[百度地图 scp server 使用](https://lbsyun.baidu.com/faq/api?title=mcpserver/quickstart#%E9%80%9A%E8%BF%87Nodejs%E6%8E%A5%E5%85%A5)

> 查看 ak：https://lbsyun.baidu.com/apiconsole/key

```sh
# 本地启动调试运行
npx @modelcontextprotocol/inspector -e BAIDU_MAP_API_KEY=<AK> -- npx -y @baidumap/mcp-server-baidu-map
```
