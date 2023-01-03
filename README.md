**Spec API**

| Type | Name | Routes | Method | Description | Middleware Auth |
| --- | --- | --- | --- | --- | --- |
|  CMS | Categories |  |  |  |  |
|   |  | /api/v1/cms/categories | GET | Get all categories | Ya |
|   |  | /api/v1/cms/categories | POST | Create categories | Ya |
|   |  | /api/v1/cms/categories/:id | GET | Get one categories by id | Ya |
|   |  | /api/v1/cms/categories/:id | PUT | Update categories | Ya |
|   |  | /api/v1/cms/categories/:id | DELETE | Delete categories | Ya |
|   | Talents |  |  |  |  |
|   |  | /api/v1/cms/talents | GET | Get all talents | Ya |
|   |  | /api/v1/cms/talents | POST | Create talents | Ya |
|   |  | /api/v1/cms/talents/:id | GET | Get one talents by id | Ya |
|   |  | /api/v1/cms/talents/:id | PUT | Update talents | Ya |
|   |  | /api/v1/cms/talents/:id | DELETE | Delete talents | Ya |
|   |  |  |  |  |  |
|   | Images |  |  |  |  |
|   |  | /api/v1/cms/images | POST | Create images | Ya |
|   |  |  |  |  |  |
|   | Events |  |  |  |  |
|   |  | /api/v1/cms/events | GET | Get all events | Ya |
|   |  | /api/v1/cms/events | POST | Create events | Ya |
|   |  | /api/v1/cms/events/:id | GET | Get one event by id | Ya |
|   |  | /api/v1/cms/events/:id | PUT | Update events | Ya |
|   |  | /api/v1/cms/events/:id | DELETE | Delete events | Ya |
|   |  | /api/v1/cms/events/:id/status | PUT | Update status events | Ya |
|   |  |  |  |  |  |
|   | Payments |  |  |  |  |
|   |  | /api/v1/cms/payments | GET | Get all payments | Ya |
|   |  | /api/v1/cms/payments | POST | Create payments | Ya |
|   |  | /api/v1/cms/payments/:id | GET | Get one payments by id | Ya |
|   |  | /api/v1/cms/payments/:id | PUT | Update payments | Ya |
|   |  | /api/v1/cms/payments/:id | DELETE | Delete payments | Ya |
|   |  |  |  |  |  |
|   | Tickets Categories |  |  |  |  |
|   |  | /api/v1/cms/tickets-categories | GET | Get all ticket categories | Ya |
|   |  | /api/v1/cms/tickets-categories | POST | Create ticket categories | Ya |
|   |  | /api/v1/cms/tickets-categories/:id | GET | Get one ticket categories | Ya |
|   |  | /api/v1/cms/tickets-categories/:id | PUT | Update ticket categories | Ya |
|   |  | /api/v1/cms/tickets-categories/:id | DELETE | Delete ticket categories | Ya |
|   |  |  |  |  |  |
|   | Auth |  |  |  |  |
|   |  | /api/v1/cms/organizers | POST | Create admin / organizer | Ya |
|   |  |  |  |  |  |
|   | Order |  |  |  |  |
|   |  | /api/v1/orders | GET | Get all order | Ya |
|   |  | /api/v1/orders/:id | GET | Get one order by id | Ya |
|   |  |  |  |  |  |
|   |  |  |  |  |  |
| User Participant | Auth |  |  |  |  |
|   |  | /api/v1/auth/signin | POST | Signin | Tidak |
|   |  |  |  |  |  |
|   | Participants |  |  |  |  |
|   |  | /api/v1/events | GET | Get all events | Tidak |
|   |  | /api/v1/events/:id | GET | Get detail events by id | Tidak |
|   |  | /api/v1/events/:id/checkout | POST | Checkout events | Ya |
|   |  | /api/v1/dashboard | GET | Get dashboard | Ya |
|   |  | /api/v1/dashboard/:id | GET | Get detail dashboard by id | Ya |
|   |  | /api/v1/participants/auth/signin | POST | Signin | Tidak |
|   |  | /api/v1/participants/auth/signup | POST | Signup | Tidak |
