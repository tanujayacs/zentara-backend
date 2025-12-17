import { supabase } from "../config/supabase";

export const getDashboardStats = async (user: any) => {
  const stats: any = {};

  if (user.role === "admin") {
    // Total berita
    const { count: totalNews } = await supabase
      .from("news")
      .select("*", { count: "exact", head: true });
    
    // Total penulis
    const { count: totalPenulis } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "penulis");
    
    // Total kategori
    const { count: totalCategories } = await supabase
      .from("categories")
      .select("*", { count: "exact", head: true });
    
    // Berita terbaru (10 terakhir)
    const { data: recentNews } = await supabase
      .from("news")
      .select(`
        *,
        categories(name)
      `)
      .order("created_at", { ascending: false })
      .limit(10);
    
    // Kategori populer
    const { data: popularCategories } = await supabase
      .from("news")
      .select("category_id, categories(name)")
      .not("category_id", "is", null);
    
    // Count per kategori
    const categoryCounts: any = {};
    popularCategories?.forEach((item: any) => {
      const categoryName = item.categories?.name;
      if (categoryName) {
        categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
      }
    });
    
    const popularCategoriesArray = Object.entries(categoryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 5);

    stats.totalNews = totalNews || 0;
    stats.totalPenulis = totalPenulis || 0;
    stats.totalCategories = totalCategories || 0;
    stats.recentNews = recentNews || [];
    stats.popularCategories = popularCategoriesArray;
  } else {
    // Penulis: hanya total berita mereka
    const { count: myNews } = await supabase
      .from("news")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);
    
    stats.totalMyNews = myNews || 0;
  }

  return stats;
};