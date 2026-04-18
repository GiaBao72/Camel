(function () {
    'use strict';

    var STORAGE_KEY = 'camel_admin_mock_data_v2';
    var LEGACY_STORAGE_KEY = 'camel_admin_mock_data_v1';
    var SESSION_KEY = 'camel_admin_session_v1';
    var LOGIN_PATH = 'admin-login-cn.html';
    var DASHBOARD_PATH = 'admin-cn.html';
    var PRODUCT_PAGE_SIZE = 6;

    function defaultData() {
        return {
            products: [
                {
                    id: 'P-1001',
                    name: '迷你手持风扇 Turbo',
                    category: '手持电风扇',
                    price: 199000,
                    stock: 45,
                    status: 'active',
                    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=320&auto=format&fit=crop'
                },
                {
                    id: 'P-1002',
                    name: '离子吹风机 Pro',
                    category: '吹风机',
                    price: 459000,
                    stock: 21,
                    status: 'active',
                    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=320&auto=format&fit=crop'
                },
                {
                    id: 'P-1003',
                    name: '手机配件 5 合 1 套装',
                    category: '手机配件',
                    price: 149000,
                    stock: 0,
                    status: 'inactive',
                    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=320&auto=format&fit=crop'
                }
            ],
            orders: [
                {
                    id: 'OD-9001',
                    customer: '阮明',
                    total: 698000,
                    status: 'pending',
                    date: '2026-04-18',
                    note: '其他h ưu tiên giao trước 18h.',
                    items: [
                        { name: '迷你手持风扇 Turbo', qty: 2, price: 199000 },
                        { name: '手机配件 5 合 1 套装', qty: 2, price: 150000 }
                    ]
                },
                {
                    id: 'OD-9002',
                    customer: '陈嘉宝',
                    total: 459000,
                    status: 'shipping',
                    date: '2026-04-17',
                    note: '已电话确认订单.',
                    items: [
                        { name: '离子吹风机 Pro', qty: 1, price: 459000 }
                    ]
                },
                {
                    id: 'OD-9003',
                    customer: '黎海',
                    total: 199000,
                    status: 'done',
                    date: '2026-04-16',
                    note: '订单已完成,客户满意.',
                    items: [
                        { name: '迷你手持风扇 Turbo', qty: 1, price: 199000 }
                    ]
                }
            ],
            users: [
                {
                    id: 'U-101',
                    name: '示例管理员',
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
            revenueSeries: createRevenueSeries(),
            updatedAt: new Date().toISOString()
        };
    }

    function enrichDemoData(data) {
        var productSeeds = [
            { id: 'P-1004', name: 'Đèn ngủ cảm ứng Luna / 露娜感应夜灯', category: 'Đèn decor / 装饰灯', price: 289000, stock: 38, status: 'active', image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=320&auto=format&fit=crop' },
            { id: 'P-1005', name: 'Pin sạc dự phòng 20.000mAh / 2万毫安充电宝', category: 'Phụ kiện điện thoại / 手机配件', price: 399000, stock: 67, status: 'active', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=320&auto=format&fit=crop' },
            { id: 'P-1006', name: 'Tai nghe Bluetooth AirBeat / AirBeat 蓝牙耳机', category: 'Âm thanh / 音频设备', price: 629000, stock: 24, status: 'active', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=320&auto=format&fit=crop' },
            { id: 'P-1007', name: 'Máy xay mini cầm tay / 迷你手持搅拌机', category: 'Gia dụng nhỏ / 小家电', price: 349000, stock: 15, status: 'active', image: 'https://images.unsplash.com/photo-1571687949920-8b7f2d9d8f2d?w=320&auto=format&fit=crop' },
            { id: 'P-1008', name: 'Bàn chải điện Sonic+ / Sonic+ 电动牙刷', category: 'Chăm sóc cá nhân / 个人护理', price: 529000, stock: 12, status: 'active', image: 'https://images.unsplash.com/photo-1559591935-abc6d8f9d0f3?w=320&auto=format&fit=crop' }
        ];

        var orderSeeds = [
            { id: 'OD-9004', customer: 'Phạm Thu / 范秋', total: 798000, status: 'pending', date: '2026-04-15', note: 'Giao giờ hành chính / 工作时间配送.', items: [{ name: 'Đèn ngủ cảm ứng Luna / 露娜感应夜灯', qty: 2, price: 289000 }, { name: 'Pin sạc dự phòng 20.000mAh / 2万毫安充电宝', qty: 1, price: 399000 }] },
            { id: 'OD-9005', customer: 'Võ Long / 武龙', total: 629000, status: 'shipping', date: '2026-04-14', note: 'Khách yêu cầu gọi trước khi giao / 送货前请先电话联系.', items: [{ name: 'Tai nghe Bluetooth AirBeat / AirBeat 蓝牙耳机', qty: 1, price: 629000 }] },
            { id: 'OD-9006', customer: 'Hà An / 何安', total: 1048000, status: 'done', date: '2026-04-13', note: 'Đã nhận đủ hàng / 已完整收货.', items: [{ name: 'Máy xay mini cầm tay / 迷你手持搅拌机', qty: 1, price: 349000 }, { name: 'Bàn chải điện Sonic+ / Sonic+ 电动牙刷', qty: 1, price: 529000 }, { name: 'Combo phụ kiện điện thoại 5in1 / 5合1手机配件套装', qty: 1, price: 170000 }] }
        ];

        var userSeeds = [
            { id: 'U-104', name: 'Linh Sales / 销售灵', email: 'linh.sales@camel.local', role: 'staff', status: 'active' },
            { id: 'U-105', name: 'An CSKH / 客服安', email: 'an.cskh@camel.local', role: 'staff', status: 'active' },
            { id: 'U-106', name: 'Khoa Kho Vận / 仓储科', email: 'khoavt@camel.local', role: 'manager', status: 'active' }
        ];

        productSeeds.forEach(function (item) {
            var idx = data.products.findIndex(function (p) { return p.id === item.id; });
            if (idx === -1) data.products.push(item);
            else data.products[idx] = Object.assign({}, data.products[idx], item);
        });

        orderSeeds.forEach(function (item) {
            var idx = data.orders.findIndex(function (o) { return o.id === item.id; });
            if (idx === -1) data.orders.push(item);
            else data.orders[idx] = Object.assign({}, data.orders[idx], item);
        });

        userSeeds.forEach(function (item) {
            var idx = data.users.findIndex(function (u) { return u.id === item.id; });
            if (idx === -1) data.users.push(item);
            else data.users[idx] = Object.assign({}, data.users[idx], item);
        });

        return data;
    }

    function createRevenueSeries() {
        var labels = [];
        var values = [];
        var now = new Date();
        for (var i = 6; i >= 0; i -= 1) {
            var d = new Date(now);
            d.setDate(now.getDate() - i);
            labels.push(String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0'));
            values.push(1200000 + Math.floor(Math.random() * 2300000));
        }
        return { labels: labels, values: values };
    }

    function ensureDataShape(data) {
        data.products = Array.isArray(data.products) ? data.products : [];
        data.orders = Array.isArray(data.orders) ? data.orders : [];
        data.users = Array.isArray(data.users) ? data.users : [];
        data.settings = data.settings || {};

        data.products = data.products.map(function (p) {
            return {
                id: p.id || ('P-' + Math.floor(Math.random() * 9000 + 1000)),
                name: p.name || '未命名商品',
                category: p.category || '其他',
                price: Number(p.price || 0),
                stock: Number(p.stock || 0),
                status: p.status === 'inactive' ? 'inactive' : 'active',
                image: p.image || ''
            };
        });

        data.orders = data.orders.map(function (o) {
            return {
                id: o.id || ('OD-' + Math.floor(Math.random() * 9000 + 1000)),
                customer: o.customer || '其他h lẻ',
                total: Number(o.total || 0),
                status: o.status || 'pending',
                date: o.date || new Date().toISOString().slice(0, 10),
                note: o.note || '',
                items: Array.isArray(o.items) ? o.items : []
            };
        });

        if (!data.revenueSeries || !Array.isArray(data.revenueSeries.labels) || !Array.isArray(data.revenueSeries.values) || data.revenueSeries.labels.length !== 7) {
            data.revenueSeries = createRevenueSeries();
        }

        return data;
    }

    function loadData() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                var legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
                if (legacyRaw) {
                    var legacy = JSON.parse(legacyRaw);
                    var migrated = ensureDataShape(legacy);
                    saveData(migrated);
                    return migrated;
                }
                var seed = defaultData();
                saveData(seed);
                return seed;
            }
            return ensureDataShape(JSON.parse(raw));
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
            holder.textContent = session.name + ' (' + roleLabel(session.role) + ')';
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

    function statusLabel(status) {
        if (status === 'active') return '启用';
        if (status === 'inactive') return '停用';
        if (status === 'pending') return '待确认';
        if (status === 'shipping') return '配送中';
        if (status === 'done') return '已完成';
        if (status === 'cancelled') return '已取消';
        return status || '';
    }

    function roleLabel(role) {
        if (role === 'owner') return '系统拥有者';
        if (role === 'manager') return '管理员';
        if (role === 'staff') return '员工';
        return role || '';
    }

    function toast(message, type) {
        var stack = document.querySelector('.toast-stack');
        if (!stack) {
            stack = document.createElement('div');
            stack.className = 'toast-stack';
            document.body.appendChild(stack);
        }
        var el = document.createElement('div');
        el.className = 'admin-toast ' + (type || 'info');
        el.textContent = message;
        stack.appendChild(el);
        setTimeout(function () {
            el.remove();
            if (!stack.children.length) stack.remove();
        }, 2400);
    }

    function escapeHtml(text) {
        if (text == null) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
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
                    name: '示例管理员',
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

    function drawRevenueChart(series) {
        var canvas = document.getElementById('revenueChart');
        if (!canvas || !series || !series.values || !series.values.length) return;

        var ctx = canvas.getContext('2d');
        var width = canvas.width;
        var height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        var padding = { top: 24, right: 20, bottom: 36, left: 50 };
        var plotWidth = width - padding.left - padding.right;
        var plotHeight = height - padding.top - padding.bottom;

        var max = Math.max.apply(null, series.values);
        var min = Math.min.apply(null, series.values);
        var span = Math.max(max - min, 1);

        ctx.strokeStyle = '#c5cbd3';
        ctx.lineWidth = 1;
        for (var g = 0; g <= 4; g += 1) {
            var gy = padding.top + (plotHeight / 4) * g;
            ctx.beginPath();
            ctx.moveTo(padding.left, gy);
            ctx.lineTo(width - padding.right, gy);
            ctx.stroke();
        }

        ctx.strokeStyle = '#006666';
        ctx.lineWidth = 2;
        ctx.beginPath();
        series.values.forEach(function (value, idx) {
            var x = padding.left + (plotWidth / (series.values.length - 1 || 1)) * idx;
            var y = padding.top + (1 - (value - min) / span) * plotHeight;
            if (idx === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        ctx.fillStyle = 'rgba(0, 102, 102, 0.12)';
        ctx.beginPath();
        series.values.forEach(function (value, idx) {
            var xArea = padding.left + (plotWidth / (series.values.length - 1 || 1)) * idx;
            var yArea = padding.top + (1 - (value - min) / span) * plotHeight;
            if (idx === 0) ctx.moveTo(xArea, yArea);
            else ctx.lineTo(xArea, yArea);
        });
        ctx.lineTo(width - padding.right, height - padding.bottom);
        ctx.lineTo(padding.left, height - padding.bottom);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#1E2938';
        ctx.font = '12px Inter';
        series.labels.forEach(function (label, idx2) {
            var xLabel = padding.left + (plotWidth / (series.labels.length - 1 || 1)) * idx2;
            ctx.fillText(label, xLabel - 14, height - 12);
        });

        var summary = document.getElementById('revenueSummary');
        if (summary) {
            var total = series.values.reduce(function (sum, v) { return sum + v; }, 0);
            summary.textContent = 'Tổng 7 ngày: ' + currency(total) + ' · Trung bình/ngày: ' + currency(Math.round(total / 7));
        }
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
                stockAlerts.innerHTML = '<div class="kpi-item">库存稳定,暂无预警.</div>';
            } else {
                stockAlerts.innerHTML = lowStocks.map(function (p) {
                    return '<div class="kpi-item"><strong>' + escapeHtml(p.name) + '</strong> 剩余 ' + p.stock + ' 件</div>';
                }).join('');
            }
        }

        if (latestOrders) {
            latestOrders.innerHTML = data.orders.slice(0, 5).map(function (order) {
                return '<tr>' +
                    '<td>' + escapeHtml(order.id) + '</td>' +
                    '<td>' + escapeHtml(order.customer) + '</td>' +
                    '<td>' + currency(order.total) + '</td>' +
                    '<td><span class="badge ' + statusBadge(order.status) + '">' + escapeHtml(statusLabel(order.status)) + '</span></td>' +
                    '<td>' + escapeHtml(order.date) + '</td>' +
                    '</tr>';
            }).join('');
        }

        drawRevenueChart(data.revenueSeries);

        var regenBtn = document.getElementById('regenRevenueBtn');
        var revenueRangeFilter = document.getElementById('revenueRangeFilter');
        if (regenBtn && !regenBtn.dataset.bound) {
            regenBtn.dataset.bound = '1';
            regenBtn.addEventListener('click', function () {
                data.revenueSeries = createRevenueSeries();
                saveData(data);
                drawRevenueChart(data.revenueSeries);
                toast('已重建模拟营收数据.', 'success');
            });
        }

        if (revenueRangeFilter && !revenueRangeFilter.dataset.bound) {
            revenueRangeFilter.dataset.bound = '1';
            revenueRangeFilter.addEventListener('change', function () {
                // mock: vẫn dữ liệu 7 ngày, chỉ cập nhật text mô phỏng
                var summary = document.getElementById('revenueSummary');
                if (summary) {
                    summary.textContent += ' · Bộ lọc: ' + revenueRangeFilter.value + ' ngày (mô phỏng).';
                }
            });
        }
    }

    function renderProductsPage(data) {
        var tableBody = document.getElementById('productsTableBody');
        var searchInput = document.getElementById('productSearchInput');
        var statusFilter = document.getElementById('productStatusFilter');
        var sortFilter = document.getElementById('productSortFilter');
        var prevBtn = document.getElementById('productPrevPageBtn');
        var nextBtn = document.getElementById('productNextPageBtn');
        var pageInfo = document.getElementById('productPageInfo');
        var tableMeta = document.getElementById('productTableMeta');

        var editForm = document.getElementById('productEditForm');
        var editId = document.getElementById('editProductId');
        var editName = document.getElementById('editProductName');
        var editCategory = document.getElementById('editProductCategory');
        var editPrice = document.getElementById('editProductPrice');
        var editStock = document.getElementById('editProductStock');
        var editStatus = document.getElementById('editProductStatus');
        var editImage = document.getElementById('editProductImage');
        var editNotice = document.getElementById('productEditNotice');
        var resetEditBtn = document.getElementById('resetEditProductBtn');

        if (!tableBody) return;

        var currentPage = 1;

        function sortProducts(list, sortValue) {
            var copy = list.slice();
            if (sortValue === 'price_asc') copy.sort(function (a, b) { return a.price - b.price; });
            if (sortValue === 'price_desc') copy.sort(function (a, b) { return b.price - a.price; });
            if (sortValue === 'stock_asc') copy.sort(function (a, b) { return a.stock - b.stock; });
            if (sortValue === 'stock_desc') copy.sort(function (a, b) { return b.stock - a.stock; });
            return copy;
        }

        function fillEditForm(product) {
            if (!editForm || !product) return;
            editId.value = product.id;
            editName.value = product.name;
            editCategory.value = product.category;
            editPrice.value = product.price;
            editStock.value = product.stock;
            editStatus.value = product.status;
            editImage.value = product.image || '';
            if (editNotice) editNotice.textContent = 'Đang sửa: ' + product.id;
        }

        function resetEditForm(message) {
            if (!editForm) return;
            editForm.reset();
            if (editId) editId.value = '';
            if (editNotice) editNotice.textContent = message || 'Chọn một 件 ở bảng để chỉnh sửa.';
        }

        function getFiltered() {
            var keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
            var status = statusFilter ? statusFilter.value : 'all';
            var sortValue = sortFilter ? sortFilter.value : 'latest';

            var filtered = data.products.filter(function (p) {
                var textMatch = !keyword || p.name.toLowerCase().indexOf(keyword) >= 0 || p.id.toLowerCase().indexOf(keyword) >= 0;
                var statusMatch = status === 'all' || p.status === status;
                return textMatch && statusMatch;
            });

            return sortProducts(filtered, sortValue);
        }

        function redraw() {
            var filtered = getFiltered();
            var totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCT_PAGE_SIZE));
            if (currentPage > totalPages) currentPage = totalPages;
            if (currentPage < 1) currentPage = 1;

            var start = (currentPage - 1) * PRODUCT_PAGE_SIZE;
            var pageRows = filtered.slice(start, start + PRODUCT_PAGE_SIZE);

            if (!pageRows.length) {
                tableBody.innerHTML = '<tr><td colspan="8">无 件 phù hợp.</td></tr>';
            } else {
                tableBody.innerHTML = pageRows.map(function (p) {
                    var imageCell = p.image
                        ? '<a href="' + escapeHtml(p.image) + '" target="_blank" rel="noopener" class="admin-btn small">查看图片</a>'
                        : '<span class="admin-footer-note">暂无</span>';
                    return '<tr>' +
                        '<td>' + escapeHtml(p.id) + '</td>' +
                        '<td>' + escapeHtml(p.name) + '</td>' +
                        '<td>' + escapeHtml(p.category) + '</td>' +
                        '<td>' + currency(p.price) + '</td>' +
                        '<td>' + p.stock + '</td>' +
                        '<td><span class="badge ' + statusBadge(p.status) + '">' + escapeHtml(statusLabel(p.status)) + '</span></td>' +
                        '<td>' + imageCell + '</td>' +
                        '<td><div class="table-actions">' +
                        '<button class="admin-btn small" data-action="edit" data-id="' + escapeHtml(p.id) + '">编辑</button>' +
                        '<button class="admin-btn small" data-action="toggle" data-id="' + escapeHtml(p.id) + '">切换状态</button>' +
                        '<button class="admin-btn small danger" data-action="delete" data-id="' + escapeHtml(p.id) + '">删除</button>' +
                        '</div></td>' +
                        '</tr>';
                }).join('');
            }

            if (pageInfo) pageInfo.textContent = '第 ' + currentPage + '/' + totalPages;
            if (tableMeta) tableMeta.textContent = '显示 ' + pageRows.length + '/' + filtered.length + ' 件 (tổng kho: ' + data.products.length + ').';
            if (prevBtn) prevBtn.disabled = currentPage <= 1;
            if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
        }

        tableBody.addEventListener('click', function (event) {
            var target = event.target;
            if (!(target instanceof HTMLButtonElement)) return;
            var id = target.dataset.id;
            var action = target.dataset.action;
            if (!id || !action) return;

            if (action === 'edit') {
                var selected = data.products.find(function (p) { return p.id === id; });
                fillEditForm(selected);
                return;
            }

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
                if (editId && editId.value === id) {
                    resetEditForm('已删除商品,并同步清空编辑表单.');
                }
            }

            saveData(data);
            redraw();
        });

        if (searchInput) searchInput.addEventListener('input', function () { currentPage = 1; redraw(); });
        if (statusFilter) statusFilter.addEventListener('change', function () { currentPage = 1; redraw(); });
        if (sortFilter) sortFilter.addEventListener('change', function () { currentPage = 1; redraw(); });

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                currentPage -= 1;
                redraw();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                currentPage += 1;
                redraw();
            });
        }

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
                var image = document.getElementById('productImage').value.trim();
                var notice = document.getElementById('productFormNotice');

                if (!id || !name) {
                    if (notice) notice.textContent = 'Cần nhập mã và tên 件.';
                    return;
                }

                if (data.products.some(function (p) { return p.id === id; })) {
                    if (notice) notice.textContent = 'Mã 件 đã tồn tại.';
                    return;
                }

                data.products.unshift({
                    id: id,
                    name: name,
                    category: category || '其他',
                    price: price,
                    stock: stock,
                    status: status || 'active',
                    image: image
                });

                saveData(data);
                addForm.reset();
                if (notice) notice.textContent = 'Đã thêm 件 mô phỏng thành công.';
                currentPage = 1;
                redraw();
            });
        }

        if (editForm) {
            editForm.addEventListener('submit', function (event) {
                event.preventDefault();
                var idValue = editId.value.trim();
                if (!idValue) {
                    if (editNotice) editNotice.textContent = 'Chọn 件 cần chỉnh sửa trước.';
                    return;
                }

                data.products = data.products.map(function (p) {
                    if (p.id !== idValue) return p;
                    return {
                        id: p.id,
                        name: editName.value.trim() || p.name,
                        category: editCategory.value.trim() || '其他',
                        price: Number(editPrice.value || 0),
                        stock: Number(editStock.value || 0),
                        status: editStatus.value,
                        image: editImage.value.trim()
                    };
                });

                saveData(data);
                if (editNotice) editNotice.textContent = '已更新 件 ' + idValue + '.';
                redraw();
            });
        }

        if (resetEditBtn) {
            resetEditBtn.addEventListener('click', function () {
                resetEditForm('编辑表单已重置.');
            });
        }

        resetEditForm('Chọn một 件 ở bảng để chỉnh sửa.');
        redraw();
    }

    function renderOrdersPage(data) {
        var tableBody = document.getElementById('ordersTableBody');
        var searchInput = document.getElementById('ordersSearchInput');
        var statusFilter = document.getElementById('ordersStatusFilter');
        var tableMeta = document.getElementById('ordersTableMeta');
        var exportBtn = document.getElementById('exportOrdersCsvBtn');

        var modal = document.getElementById('orderDetailModal');
        var modalContent = document.getElementById('orderDetailContent');
        var closeModalBtn = document.getElementById('closeOrderModalBtn');

        if (!tableBody) return;

        function openModal() {
            if (!modal) return;
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
        }

        function closeModal() {
            if (!modal) return;
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
        }

        function filteredOrders() {
            var keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
            var status = statusFilter ? statusFilter.value : 'all';
            return data.orders.filter(function (order) {
                var textMatch = !keyword || order.id.toLowerCase().indexOf(keyword) >= 0 || order.customer.toLowerCase().indexOf(keyword) >= 0;
                var statusMatch = status === 'all' || order.status === status;
                return textMatch && statusMatch;
            });
        }

        function draw() {
            var list = filteredOrders();

            if (!list.length) {
                tableBody.innerHTML = '<tr><td colspan="6">没有匹配的订单.</td></tr>';
                if (tableMeta) tableMeta.textContent = '0 条订单匹配筛选.';
                return;
            }

            tableBody.innerHTML = list.map(function (order) {
                return '<tr>' +
                    '<td><input type="checkbox" class="order-row-check" data-id="' + escapeHtml(order.id) + '"></td>' +
                    '<td>' + escapeHtml(order.id) + '</td>' +
                    '<td>' + escapeHtml(order.customer) + '</td>' +
                    '<td>' + currency(order.total) + '</td>' +
                    '<td><span class="badge ' + statusBadge(order.status) + '">' + escapeHtml(statusLabel(order.status)) + '</span></td>' +
                    '<td>' + escapeHtml(order.date) + '</td>' +
                    '<td><div class="table-actions">' +
                    '<select class="order-status-select" data-id="' + escapeHtml(order.id) + '">' +
                    '<option value="pending" ' + (order.status === 'pending' ? 'selected' : '') + '>待确认</option>' +
                    '<option value="shipping" ' + (order.status === 'shipping' ? 'selected' : '') + '>配送中</option>' +
                    '<option value="done" ' + (order.status === 'done' ? 'selected' : '') + '>已完成</option>' +
                    '<option value="cancelled" ' + (order.status === 'cancelled' ? 'selected' : '') + '>已取消</option>' +
                    '</select>' +
                    '<button class="admin-btn small" data-action="detail" data-id="' + escapeHtml(order.id) + '">详情</button>' +
                    '</div></td>' +
                    '</tr>';
            }).join('');

            if (tableMeta) tableMeta.textContent = list.length + '/' + data.orders.length + ' 条订单正在显示.';
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

        tableBody.addEventListener('click', function (event) {
            var target = event.target;
            if (!(target instanceof HTMLButtonElement)) return;
            if (target.dataset.action !== 'detail') return;
            var id = target.dataset.id;
            if (!id || !modalContent) return;

            var order = data.orders.find(function (item) { return item.id === id; });
            if (!order) return;

            var itemsHtml = (order.items || []).map(function (item) {
                return '<li>' + escapeHtml(item.name) + ' × ' + Number(item.qty || 0) + ' · ' + currency(item.price || 0) + '</li>';
            }).join('');

            modalContent.innerHTML = '' +
                '<div class="simple-item"><strong>Mã đơn:</strong> ' + escapeHtml(order.id) + '</div>' +
                '<div class="simple-item"><strong>其他h hàng:</strong> ' + escapeHtml(order.customer) + '</div>' +
                '<div class="simple-item"><strong>Ngày:</strong> ' + escapeHtml(order.date) + '</div>' +
                '<div class="simple-item"><strong>Trạng thái:</strong> <span class="badge ' + statusBadge(order.status) + '">' + escapeHtml(statusLabel(order.status)) + '</span></div>' +
                '<div class="simple-item"><strong>Tổng tiền:</strong> ' + currency(order.total) + '</div>' +
                '<div class="simple-item"><strong>Ghi chú:</strong> ' + escapeHtml(order.note || '无') + '</div>' +
                '<div class="simple-item"><strong>Sản phẩm:</strong><ul class="order-items">' + (itemsHtml || '<li>无 item</li>') + '</ul></div>';

            openModal();
        });

        if (searchInput) searchInput.addEventListener('input', draw);
        if (statusFilter) statusFilter.addEventListener('change', draw);

        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (modal) {
            modal.addEventListener('click', function (event) {
                if (event.target === modal) closeModal();
            });
        }

        if (exportBtn) {
            exportBtn.addEventListener('click', function () {
                var rows = filteredOrders();
                var headers = ['id', 'customer', 'total', 'status', 'date', 'note'];
                var csv = headers.join(',') + '\n' + rows.map(function (order) {
                    return [
                        order.id,
                        order.customer,
                        order.total,
                        order.status,
                        order.date,
                        (order.note || '').replace(/,/g, ';')
                    ].map(function (cell) {
                        return '"' + String(cell).replace(/"/g, '""') + '"';
                    }).join(',');
                }).join('\n');

                var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                var url = URL.createObjectURL(blob);
                var link = document.createElement('a');
                link.href = url;
                link.download = 'camel-orders-mock.csv';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                toast('订单 CSV 导出成功.', 'success');
            });
        }

        var checkAll = document.getElementById('ordersCheckAll');
        if (checkAll) {
            checkAll.addEventListener('change', function () {
                var checks = tableBody.querySelectorAll('.order-row-check');
                checks.forEach(function (c) { c.checked = checkAll.checked; });
            });
        }

        function getCheckedOrderIds() {
            return Array.from(tableBody.querySelectorAll('.order-row-check:checked')).map(function (c) { return c.dataset.id; });
        }

        function bulkUpdateStatus(nextStatus) {
            var ids = getCheckedOrderIds();
            if (!ids.length) {
                toast('请至少选择 1 个订单.', 'warning');
                return;
            }
            data.orders = data.orders.map(function (order) {
                if (ids.indexOf(order.id) === -1) return order;
                return Object.assign({}, order, { status: nextStatus });
            });
            saveData(data);
            draw();
            toast('已更新 ' + ids.length + ' 个订单.', 'success');
        }

        var btnShipping = document.getElementById('ordersMarkShippingBtn');
        var btnDone = document.getElementById('ordersMarkDoneBtn');
        if (btnShipping) btnShipping.addEventListener('click', function () { bulkUpdateStatus('shipping'); });
        if (btnDone) btnDone.addEventListener('click', function () { bulkUpdateStatus('done'); });

        draw();
    }

    function renderUsersPage(data) {
        var tableBody = document.getElementById('usersTableBody');
        var addForm = document.getElementById('userAddForm');
        var searchInput = document.getElementById('usersSearchInput');
        var statusFilter = document.getElementById('usersStatusFilter');
        if (!tableBody) return;

        function getFilteredUsers() {
            var keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
            var status = statusFilter ? statusFilter.value : 'all';
            return data.users.filter(function (user) {
                var textMatch = !keyword || user.name.toLowerCase().indexOf(keyword) >= 0 || user.email.toLowerCase().indexOf(keyword) >= 0;
                var statusMatch = status === 'all' || user.status === status;
                return textMatch && statusMatch;
            });
        }

        function draw() {
            var list = getFilteredUsers();
            tableBody.innerHTML = list.map(function (user) {
                return '<tr>' +
                    '<td>' + escapeHtml(user.id) + '</td>' +
                    '<td>' + escapeHtml(user.name) + '</td>' +
                    '<td>' + escapeHtml(user.email) + '</td>' +
                    '<td>' + escapeHtml(roleLabel(user.role)) + '</td>' +
                    '<td><span class="badge ' + statusBadge(user.status) + '">' + escapeHtml(statusLabel(user.status)) + '</span></td>' +
                    '</tr>';
            }).join('') || '<tr><td colspan="5">无 người dùng phù hợp.</td></tr>';
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
                    if (notice) notice.textContent = '请填写用户编号、姓名和邮箱.';
                    toast('用户信息不完整.', 'warning');
                    return;
                }

                if (data.users.some(function (u) { return u.id === id; })) {
                    if (notice) notice.textContent = '用户编号已存在.';
                    toast('用户编号已存在.', 'danger');
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
                if (notice) notice.textContent = '已新增模拟用户.';
                toast('已新增用户.', 'success');
                draw();
            });
        }

        if (searchInput) searchInput.addEventListener('input', draw);
        if (statusFilter) statusFilter.addEventListener('change', draw);

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
            if (notice) notice.textContent = '模拟配置已保存到 localStorage.';
        });
    }

    function init() {
        protectPage();
        mountLoginPage();
        logoutHandler();
        bindSessionUser();

        var data = enrichDemoData(loadData());
        saveData(data);
        renderDashboard(data);
        renderProductsPage(data);
        renderOrdersPage(data);
        renderUsersPage(data);
        renderSettingsPage(data);
    }

    document.addEventListener('DOMContentLoaded', init);
})();
