<script>
  import '../app.css';
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
  <header class="bg-surface-100-800-token h3 p-4 shadow-2xl">Beetrave</header>

  <div class="grid grid-cols-1 md:grid-cols-[auto_1fr]">
    <aside class="min-w-64 overflow-y-scroll p-4">
      <nav class="list-nav grid grid-cols-[auto]">
        <a href="/">Home</a>
        <a href="/scripts">Scripts</a>
      </nav>
    </aside>

    <main class="space-y-4 p-4"><slot></slot></main>
  </div>
</div>
