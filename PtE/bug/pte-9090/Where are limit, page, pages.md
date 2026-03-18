

Câu hỏi rất chính xác. Hãy trace toàn bộ flow từ client gọi API đến nhận response.

## Trace: `limit`, `page`, `pages` đến từ đâu?

### Flow hoàn chỉnh:

```
Client → HTTP Request → ActionHero framework → v4GetInvoiceList.run() → response
```

Nhìn vào `run()` method:

```javascript
async run(data) {
    let dataRes = await this.executeFunction(data);
    data.response.errorCode = util.formatError(dataRes.err);
    data.response.data = dataRes.data;
    // ActionHero framework tự serialize data.response thành JSON và gửi về client
}
```

### `executeFunction` trả về gì?

```javascript
// isSelectMax = true
return { data: mappedDocs };          // → data.response.data = mappedDocs (plain array)

// isSelectMax = false  
return { data: normalizedResult };    // → data.response.data = { docs, total }
```

### Kết luận: **Không có `limit`, `page`, `pages` ở bất kỳ đâu trong flow**

| Layer | Return | Có `limit/page/pages`? |
|---|---|---|
| `getInvoiceListBySort` (DAL) | `[{ docs, total }]` từ `$facet` | ❌ |
| `getInvoiceList` (Logic) | `{ docs, total }` = `result[0]` | ❌ |
| `v4GetInvoiceList` (Action) | `{ data: { docs, total } }` | ❌ |
| ActionHero framework | `{ data: { docs, total }, errorCode }` | ❌ |

### Client nhận được:

```javascript
// _res từ HTTP response:
{
  errorCode: null,
  data: {
    docs: [...],   // ✅
    total: 200,    // ✅
    // ❌ KHÔNG có limit, page, pages
  }
}
```

> **`limit`, `page`, `pages` không tồn tại trong flow này.** Nếu client cần pagination metadata, nó phải tự tính từ `requestData.paging` mà nó đã gửi lên:
> - `limit` = `requestData.paging.pageSize`
> - `page` = `requestData.paging.pageIndex`  
> - `pages` = `Math.ceil(total / pageSize)`