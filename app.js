const $ = (s) => document.querySelector(s);
const toast = (message) => { const el = $('#toast'); el.textContent = message; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2600); };

document.querySelectorAll('.choice').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll(`.choice[data-group="${btn.dataset.group}"]`).forEach(x => x.classList.remove('selected'));
  btn.classList.add('selected');
  const goal = btn.dataset.value;
  document.querySelector('.hero h2').textContent = goal === '减脂' ? '燃脂效率 · 保留肌肉' : goal === '力量' ? '力量进阶 · 专注表现' : '胸部力量 · 渐进超负荷';
  toast(`已切换为${goal}方向，方案正在同步调整`);
}));

$('#duration').addEventListener('change', e => $('#customTime').classList.toggle('hidden', e.target.value !== '自定义'));
const musclePlans = {
  '胸部': ['胸大肌 · 胸小肌', '杠铃卧推', '胸大肌（中部） · 三头肌 · 前束三角肌', '4 组 × 8–10 次 · 组间休息 90 秒'],
  '二头肌': ['肱二头肌 · 肱肌', '哑铃交替弯举', '肱二头肌 · 肱肌 · 肱桡肌', '3 组 × 10–12 次 · 组间休息 60 秒'],
  '肩部': ['三角肌前束 · 中束', '坐姿哑铃推举', '三角肌前束 · 中束 · 肱三头肌', '4 组 × 8–10 次 · 组间休息 90 秒'],
  '背部': ['背阔肌 · 菱形肌', '高位下拉', '背阔肌 · 肱二头肌 · 大圆肌', '4 组 × 8–12 次 · 组间休息 75 秒'],
  '核心': ['腹直肌 · 腹横肌', '绳索卷腹', '腹直肌 · 腹横肌', '3 组 × 12–15 次 · 组间休息 45 秒'],
  '腿部': ['股四头肌 · 臀大肌', '杠铃深蹲', '股四头肌 · 臀大肌 · 腘绳肌', '4 组 × 6–10 次 · 组间休息 120 秒']
};
const selectMuscle = (name) => {
  const [caption, exercise, targets, details] = musclePlans[name];
  document.querySelectorAll('.muscle').forEach(x => x.classList.toggle('active', x.dataset.muscle === name));
  document.querySelectorAll('.muscle-shape').forEach(x => x.classList.toggle('active-shape', x.dataset.muscle === name));
  $('#muscleCaption').textContent = caption;
  $('#exercisePrescription').innerHTML = `<p class="eyebrow">${name.toUpperCase()} · 推荐动作</p><b>${exercise}</b><span>${targets}</span><small>${details}</small>`;
  toast(`已展示${name}的具体肌群与动作`);
};
document.querySelectorAll('.muscle').forEach(btn => btn.addEventListener('click', () => selectMuscle(btn.dataset.muscle)));
document.querySelectorAll('.muscle-shape').forEach(shape => shape.addEventListener('click', () => selectMuscle(shape.dataset.muscle)));
document.querySelectorAll('.source').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.source').forEach(x => x.classList.remove('active')); btn.classList.add('active');
  const canteen = btn.dataset.source === 'canteen'; $('#foodChips').classList.toggle('hidden', canteen); $('#canteenSearch').classList.toggle('hidden', !canteen);
}));
$('#openProfile').onclick = () => $('#profileModal').classList.remove('hidden');
$('#profileButton').onclick = () => $('#profileModal').classList.remove('hidden');
document.querySelector('[data-close]').onclick = () => $('#profileModal').classList.add('hidden');
$('#profileModal').addEventListener('click', e => { if(e.target.id === 'profileModal') e.currentTarget.classList.add('hidden'); });
$('#photoInput').addEventListener('change', e => { const file = e.target.files[0]; if (!file) return; const area = $('#photoArea'); area.style.backgroundImage = `linear-gradient(#0002,#0007), url(${URL.createObjectURL(file)})`; area.classList.add('preview'); area.querySelector('b').textContent = '已上传 · 点击替换'; area.querySelector('small').textContent = '用于本地体态追踪预览'; });
$('#saveProfile').onclick = () => { const name = $('#userName').value.trim(); if (!name) return toast('请先填写你的名字'); $('#welcomeTitle').innerHTML = `你好，${name} <span>✦</span>`; $('#sidebarName').innerHTML = `${name}<br/><small>个人档案已建立</small>`; $('#avatarInitial').textContent = name.slice(0, 1); $('#openProfile').textContent = '更新我的档案'; $('#profileModal').classList.add('hidden'); toast('身体档案已保存，个性化计划已更新'); };
const showGymResults = (query) => { const results = $('#gymResults'); results.innerHTML = `<button class="gym-result"><b>${query} · 候选地点</b><small>请在地图服务中核对地址后点击确认选择</small></button>`; results.classList.remove('hidden'); results.querySelector('button').onclick = () => { $('#gymName').textContent = query; $('#gymAddress').textContent = '地点已由你确认；请继续手动核对并勾选可用器械。'; $('#gymLocation').classList.remove('empty-location'); results.classList.add('hidden'); toast('已选择场地；器械信息仍需你确认'); }; };
$('#searchGym').onclick = () => { const q = $('#gymInput').value.trim(); if (!q) return toast('请输入健身房名称或详细地址'); showGymResults(q); };
$('#locateGym').onclick = () => { if (!navigator.geolocation) return toast('当前浏览器不支持定位，请输入地址搜索'); navigator.geolocation.getCurrentPosition(() => { $('#gymInput').value = '当前位置附近'; showGymResults('当前位置附近的健身房'); toast('已取得大致位置，请从搜索结果确认具体场地'); }, () => toast('未获得定位权限，请直接输入名称或地址搜索')); };
$('#searchCanteen').onclick = () => { const place = $('#placeInput').value.trim(); if (!place) return toast('请输入学校、公司或食堂名称'); const results = $('#canteenResults'); results.innerHTML = `<button><b>搜索「${place}」的餐饮点</b><small>需要接入地图与菜单数据后，才会显示可确认的实际档口和菜品。</small></button>`; results.classList.remove('hidden'); };
$('#addEquipment').onclick = () => toast('可在后续版本中添加自有器械与替代动作');
$('#generate').onclick = () => toast('已基于目标、器械、训练时间和食材刷新方案');
$('#startTraining').onclick = () => toast('训练已开始：第 1 项 · 杠铃卧推');
document.querySelectorAll('.meal-swap').forEach(btn => btn.onclick = () => toast('已根据你的营养缺口更换一道搭配'));
