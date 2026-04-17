(function () {
    'use strict';

    var STORAGE_KEY = 'camel_admin_mock_data_v1';
    var SESSION_KEY = 'camel_admin_session_v1';
    var LOGIN_PATH = 'admin-login.html';
    var DASHBOARD_PATH = 'admin.html';

    function defaultData() {
        return {
            products: [
                {
                    id: 'P-1001',
                    name: 'Quạt cầm tay Turbo Mini',
                    category: 'Quạt điện cầm tay',
                    price: 199000,
                    stock: 45,
                    status: 'active'
                },
                {
                    id: 'P-1002',
                    name: 'Máy sấy tóc Ion Pro',
                    category: 'Máy sấy tóc',
                    price: 459000,
                    stock: 21,
                    status: 'active'
                },
                {
                    id: 'P-1003',
                    name: 'Combo phụ kiện điện thoại 5in1',
                    category: 'Phụ kiện điện thoại',
                    price: 149000,
                    stock: 0,
                    status: 'inactive'
                }
            ],
            orders: [
                {
                    id: 'OD-9001',
                    customer: 'Nguyễn Minh',
                    total: 698000,
                    status: 'pending',
                    date: '2026-04-18'
                },
                {
                    id: 'OD-9002',
                    customer: 'Trần Gia Bảo',
                    total: 459000,
                    status: 'shipping',
                    date: '2026-04-17'
                },
                {
                    id: 'OD-9003',
                    customer: 'Lê Hải',
                    total: 199000,
                    status: 'done',
                    date: '2026-04-16'
                }
            ],
            users: [
                {
                    id: 'U-101',
                    name: 'Admin Demo',
                    email: 'admin@camel.local',
                    role: 'owner',
                    status: 'active'
                },
                {
                    id: 'U-102',
                    name: 'Sale Lead',
                    email: 'sale@camel.local',
                    role: 'manager',
                    status: 'active'
                },
                {
                    id: 'U-103',
                    name: 'Support Agent',
                    email: 'support@camel.local',
                    role: 'staff',
                    status: 'inactive'
                }
            ],
            settings: {
                siteName: 'Camel eCommerce',
                supportEmail: 'support@camel.local',
                shippingFee: 30000,
                discountDefault: 10,
                heroBannerTitle: 'Flash Sale 4.4 - Mua nhanh kẻo lỡ'
            },
            updatedAt: new Date().toISOString()
        };
    }

    function loadData() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                var seed = defaultData();
                saveData(seed);
                return seed;
            }
            return JSON.parse(raw);
        } catch (err) {
            var fallback = defaultData();
            saveData(fallback);
            return fallback;
        }
    }

    function saveData(data) {
        data.updatedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function getSession() {
        try {
            var raw = localStorage.getItem(SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (err) {
            return null;
        }
    }

    function setSession(session) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }

    function clearSession() {
        localStorage.removeItem(SESSION_KEY);
    }

    function protectPage() {
        var body = document.body;
        if (!body) return;
        var needAuth = body.dataset.adminProtected === 'true';
        if (!needAuth) return;
        if (!getSession()) {
            window.location.href = LOGIN_PATH;
        }
    }

    function logoutHandler() {
        var btn = document.getElementById('adminLogoutBtn');
        if (!btn) return;
        btn.addEventListener('click', function () {
            clearSession();
            window.location.href = LOGIN_PATH;
        });
    }

    function bindSessionUser() {
        var session = getSession();
        var holder = document.getElementById('adminSessionUser');
        if (holder && session) {
            holder.textContent = session.name + ' (' + session.role + ')';
        }
    }

    function numberFormat(value) {
        return new Intl.NumberFormat('vi-VN').format(value || 0);
    }

    function currency(value) {
        return numberFormat(value) + ' VNĐ';
    }

    function statusBadge(status) {
        if (status === 'active' || status === 'done') return 'success';
        if (status === 'pending') return 'warning';
        if (status === 'shipping') return 'info';
        return 'danger';
    }

    function mountLoginPage() {
        var form = document.getElementById('adminLoginForm');
        if (!form) return;

        if (getSession()) {
            window.location.href = DASHBOARD_PATH;
            return;
        }

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var email = document.getElementById('loginEmail').value.trim();
            var password = document.getElementById('loginPassword').value.trim();
            var message = document.getElementById('loginMessage');

            if (email === 'admin@camel.local' && password === '123456') {
                setSession({
                    email: email,
                    name: 'Admin Demo',
                    role: 'owner',
                    loginAt: new Date().toISOString()
                });
                window.location.href = DASHBOARD_PATH;
                return;
            }

            if (message) {
                message.textContent = 'Sai tài khoản hoặc mật khẩu demo. Dùng admin@camel.local / 123456';
            }
        });
    }

    function renderDashboard(data) {
        var statProducts = document.getElementById('statProducts');
        var statOrders = document.getElementById('statOrders');
        var statRevenue = document.getElementById('statRevenue');
        var statUsers = document.getElementById('statUsers');
        var stockAlerts = document.getElementById('stockAlerts');
        var latestOrders = document.getElementById('latestOrders');

        if (statProducts) statProducts.textContent = data.products.length;
        if (statOrders) statOrders.textContent = data.orders.length;
        if (statRevenue) {
            var totalRevenue = data.orders.reduce(function (sum, item) {
                return item.status === 'done' ? sum + item.total : sum;
            }, 0);
            statRevenue.textContent = currency(totalRevenue);
        }
        if (statUsers) statUsers.textContent = data.users.length;

        if (stockAlerts) {
            var lowStocks = data.products.filter(function (p) {
                return Number(p.stock) <= 10;
            });
            if (!lowStocks.length) {
                stockAlerts.innerHTML = '<div class="kpi-item">Tồn kho ổn định, chưa có cảnh báo.</div>';
            } else {
                stockAlerts.innerHTML = lowStocks.map(function (p) {
                    return '<div class="kpi-item"><strong>' + p.name + '</strong> Còn ' + p.stock + ' sản phẩm</div>';
                }).join('');
            }
        }

        if (latestOrders) {
            latestOrders.innerHTML = data.orders.slice(0, 5).map(function (order) {
                return '<tr>' +
                    '<td>' + order.id + '</td>' +
                    '<td>' + order.customer + '</td>' +
                    '<td>' + currency(order.total) + '</td>' +
                    '<td><span class="badge ' + statusBadge(order.status) + '">' + order.status + '</span></td>' +
                    '<td>' + order.date + '</td>' +
                    '</tr>';
            }).join('');
        }
    }

    function renderProductsPage(data) {
        var tableBody = document.getElementById('productsTableBody');
        var searchInput = document.getElementById('productSearchInput');
        var statusFilter = document.getElementById('productStatusFilter');

        function redraw() {
            if (!tableBody) return;
            var keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
            var status = statusFilter ? statusFilter.value : 'all';

            var filtered = data.products.filter(function (p) {
                var textMatch = !keyword || p.name.toLowerCase().indexOf(keyword) >= 0 || p.id.toLowerCase().indexOf(keyword) >= 0;
                var statusMatch = status === 'all' || p.status === status;
                return textMatch && statusMatch;
            });

            if (!filtered.length) {
                tableBody.innerHTML = '<tr><td colspan="7">Không có sản phẩm phù hợp.</td></tr>';
                return;
            }

            tableBody.innerHTML = filtered.map(function (p) {
                return '<tr>' +
                    '<td>' + p.id + '</td>' +
                    '<td>' + p.name + '</td>' +
                    '<td>' + p.category + '</td>' +
                    '<td>' + currency(p.price) + '</td>' +
                    '<td>' + p.stock + '</td>' +
                    '<td><span class="badge ' + statusBadge(p.status) + '">' + p.status + '</span></td>' +
                    '<td>' +
                    '<button class="admin-btn" data-action="toggle" data-id="' + p.id + '">Đổi trạng thái</button> ' +
                    '<button class="admin-btn danger" data-action="delete" data-id="' + p.id + '">Xóa</button>' +
                    '</td>' +
                    '</tr>';
            }).join('');
        }

        if (tableBody) {
            tableBody.addEventListener('click', function (event) {
                var target = event.target;
                if (!(target instanceof HTMLButtonElement)) return;
                var id = target.dataset.id;
                var action = target.dataset.action;
                if (!id || !action) return;

                if (action === 'toggle') {
                    data.products = data.products.map(function (p) {
                        if (p.id !== id) return p;
                        return Object.assign({}, p, {
                            status: p.status === 'active' ? 'inactive' : 'active'
                        });
                    });
                }

                if (action === 'delete') {
                    data.products = data.products.filter(function (p) {
                        return p.id !== id;
                    });
                }

                saveData(data);
                redraw();
            });
        }

        if (searchInput) searchInput.addEventListener('input', redraw);
        if (statusFilter) statusFilter.addEventListener('change', redraw);

        var addForm = document.getElementById('productAddForm');
        if (addForm) {
            addForm.addEventListener('submit', function (event) {
                event.preventDefault();
                var id = document.getElementById('productId').value.trim();
                var name = document.getElementById('productName').value.trim();
                var category = document.getElementById('productCategory').value.trim();
                var price = Number(document.getElementById('productPrice').value || 0);
                var stock = Number(document.getElementById('productStock').value || 0);
                var status = document.getElementById('productStatus').value;
                var notice = document.getElementById('productFormNotice');

                if (!id || !name) {
                    if (notice) notice.textContent = 'Cần nhập mã và tên sản phẩm.';
                    return;
                }

                if (data.products.some(function (p) { return p.id === id; })) {
                    if (notice) notice.textContent = 'Mã sản phẩm đã tồn tại.';
                    return;
                }

                data.products.unshift({
                    id: id,
                    name: name,
                    category: category || 'Khác',
                    price: price,
                    stock: stock,
                    status: status || 'active'
                });

                saveData(data);
                addForm.reset();
                if (notice) notice.textContent = 'Đã thêm sản phẩm mô phỏng thành công.';
                redraw();
            });
        }

        redraw();
    }

    function renderOrdersPage(data) {
        var tableBody = document.getElementById('ordersTableBody');
        if (!tableBody) return;

        function draw() {
            tableBody.innerHTML = data.orders.map(function (order) {
                return '<tr>' +
                    '<td>' + order.id + '</td>' +
                    '<td>' + order.customer + '</td>' +
                    '<td>' + currency(order.total) + '</td>' +
                    '<td><span class="badge ' + statusBadge(order.status) + '">' + order.status + '</span></td>' +
                    '<td>' + order.date + '</td>' +
                    '<td>' +
                    '<select class="order-status-select" data-id="' + order.id + '">' +
                    '<option value="pending" ' + (order.status === 'pending' ? 'selected' : '') + '>pending</option>' +
                    '<option value="shipping" ' + (order.status === 'shipping' ? 'selected' : '') + '>shipping</option>' +
                    '<option value="done" ' + (order.status === 'done' ? 'selected' : '') + '>done</option>' +
                    '<option value="cancelled" ' + (order.status === 'cancelled' ? 'selected' : '') + '>cancelled</option>' +
                    '</select>' +
                    '</td>' +
                    '</tr>';
            }).join('');
        }

        tableBody.addEventListener('change', function (event) {
            var target = event.target;
            if (!(target instanceof HTMLSelectElement)) return;
            var id = target.dataset.id;
            if (!id) return;
            data.orders = data.orders.map(function (order) {
                if (order.id !== id) return order;
                return Object.assign({}, order, { status: target.value });
            });
            saveData(data);
            draw();
        });

        draw();
    }

    function renderUsersPage(data) {
        var tableBody = document.getElementById('usersTableBody');
        var addForm = document.getElementById('userAddForm');
        if (!tableBody) return;

        function draw() {
            tableBody.innerHTML = data.users.map(function (user) {
                return '<tr>' +
                    '<td>' + user.id + '</td>' +
                    '<td>' + user.name + '</td>' +
                    '<td>' + user.email + '</td>' +
                    '<td>' + user.role + '</td>' +
                    '<td><span class="badge ' + statusBadge(user.status) + '">' + user.status + '</span></td>' +
                    '</tr>';
            }).join('');
        }

        if (addForm) {
            addForm.addEventListener('submit', function (event) {
                event.preventDefault();
                var id = document.getElementById('userId').value.trim();
                var name = document.getElementById('userName').value.trim();
                var email = document.getElementById('userEmail').value.trim();
                var role = document.getElementById('userRole').value;
                var status = document.getElementById('userStatus').value;
                var notice = document.getElementById('userFormNotice');

                if (!id || !name || !email) {
                    if (notice) notice.textContent = 'Điền đủ mã, tên và email.';
                    return;
                }

                if (data.users.some(function (u) { return u.id === id; })) {
                    if (notice) notice.textContent = 'Mã user đã tồn tại.';
                    return;
                }

                data.users.unshift({
                    id: id,
                    name: name,
                    email: email,
                    role: role,
                    status: status
                });
                saveData(data);
                addForm.reset();
                if (notice) notice.textContent = 'Đã thêm user mô phỏng.';
                draw();
            });
        }

        draw();
    }

    function renderSettingsPage(data) {
        var form = document.getElementById('settingsForm');
        if (!form) return;

        document.getElementById('settingSiteName').value = data.settings.siteName || '';
        document.getElementById('settingSupportEmail').value = data.settings.supportEmail || '';
        document.getElementById('settingShippingFee').value = data.settings.shippingFee || 0;
        document.getElementById('settingDiscount').value = data.settings.discountDefault || 0;
        document.getElementById('settingBanner').value = data.settings.heroBannerTitle || '';

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            data.settings.siteName = document.getElementById('settingSiteName').value.trim();
            data.settings.supportEmail = document.getElementById('settingSupportEmail').value.trim();
            data.settings.shippingFee = Number(document.getElementById('settingShippingFee').value || 0);
            data.settings.discountDefault = Number(document.getElementById('settingDiscount').value || 0);
            data.settings.heroBannerTitle = document.getElementById('settingBanner').value.trim();
            saveData(data);
            var notice = document.getElementById('settingsNotice');
            if (notice) notice.textContent = 'Đã lưu cấu hình mô phỏng vào localStorage.';
        });
    }

    function init() {
        protectPage();
        mountLoginPage();
        logoutHandler();
        bindSessionUser();

        var data = loadData();
        renderDashboard(data);
        renderProductsPage(data);
        renderOrdersPage(data);
        renderUsersPage(data);
        renderSettingsPage(data);
    }

    document.addEventListener('DOMContentLoaded', init);
})();
