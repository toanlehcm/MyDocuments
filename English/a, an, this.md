
on - checked subject. Has a, an, this aliases

phan biet a, an, this khac nhau ntn

Trong CASL, các alias a, an, this đều dùng để chỉ đối tượng (subject) mà bạn muốn kiểm tra quyền, nhưng có sự khác biệt nhỏ:

1. a và an
Dùng để chỉ tên loại đối tượng (class name, model name, string).
Ví dụ:
a và an giống nhau, chỉ khác về mặt ngữ pháp tiếng Anh (a book, an article).
2. this
Dùng để chỉ một instance cụ thể (một object cụ thể, không phải tên loại).
Ví dụ:
this={post} sẽ kiểm tra quyền trên chính object post đó (có thể kiểm tra thêm điều kiện thuộc tính).
Tóm lại:
Alias	Ý nghĩa	Dùng cho	Ví dụ
a	Loại đối tượng (string)	Tên class/model	<Can I="create" a="Post" />
an	Loại đối tượng (string)	Tên class/model	<Can I="create" an="User" />
this	Instance cụ thể (object)	Đối tượng cụ thể	<Can I="read" this={post} />
Tóm tắt:

a/an: kiểm tra quyền trên loại đối tượng (theo tên).
this: kiểm tra quyền trên một instance cụ thể (object cụ thể).