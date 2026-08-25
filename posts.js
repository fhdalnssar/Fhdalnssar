// يجلب المقالات من data/posts.json ويعرضها بالصفحة الرئيسية أو صفحة المقال

async function fetchPosts() {
  const res = await fetch('data/posts.json');
  const data = await res.json();
  return data.posts || [];
}

function paragraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map(p => `<p>${p.trim().replace(/\n/g, '<br>')}</p>`)
    .join('');
}

async function renderFeed(containerId) {
  const container = document.getElementById(containerId);
  try {
    const posts = await fetchPosts();
    if (!posts.length) {
      container.innerHTML = '<p class="post-meta">لا توجد مقالات بعد.</p>';
      return;
    }
    container.innerHTML = posts.map((post, i) => `
      <article class="post">
        <div class="post-meta">${post.date} · ${post.category}</div>
        <h2>${post.title}</h2>
        <p>${post.excerpt || ''}</p>
        <a class="read-more" href="post.html?id=${i}">اضغط للمزيد ←</a>
      </article>
    `).join('');
  } catch (e) {
    container.innerHTML = '<p class="post-meta">تعذّر تحميل المقالات.</p>';
  }
}

async function renderSinglePost(containerId) {
  const container = document.getElementById(containerId);
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  try {
    const posts = await fetchPosts();
    const post = posts[id];
    if (!post) {
      container.innerHTML = '<p class="post-meta">المقال غير موجود.</p>';
      return;
    }
    document.title = post.title;
    container.innerHTML = `
      <div class="post-meta">${post.date} · ${post.category}</div>
      <h2>${post.title}</h2>
      ${paragraphs(post.body || post.excerpt || '')}
    `;
  } catch (e) {
    container.innerHTML = '<p class="post-meta">تعذّر تحميل المقال.</p>';
  }
}
