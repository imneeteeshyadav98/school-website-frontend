// src/lib/fetchFaculty.ts

export type FacultyMember = {
    name: string;
    designation: string;
    photo: string | null;
    bio: string;
  };
  
  export async function fetchFaculty(): Promise<FacultyMember[]> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/faculties?populate=photo`,
        { cache: "no-store" }
      );
      console.log("Data Faculty",res)
      if (!res.ok) {
        console.error("❌ Failed to fetch faculty data");
        return [];
      }
  
      const data = await res.json();
  
      if (!data?.data || !Array.isArray(data.data)) {
        console.error("❌ Unexpected faculty API response structure:", data);
        return [];
      }
  
      return data.data.map((item: any): FacultyMember => {
        const attrs = item;
  
        // Extract bio text from Rich Text Block (Strapi v4)
        const rawBio = attrs.bio;
        let bioText = "";
  
        if (Array.isArray(rawBio)) {
          bioText = rawBio
            .map((block: any) =>
              block.children?.map((child: any) => child.text).join(" ")
            )
            .join("\n");
        }
  
        // Extract photo URL safely
        const photoUrl = attrs.photo?.[0]?.url
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.photo[0].url}`
          : null;
  
        return {
          name: attrs.name || "N/A",
          designation: attrs.designation || "",
          bio: bioText || "No bio available.",
          photo: photoUrl,
        };
      });
    } catch (err) {
      console.error("❌ Error fetching faculty:", err);
      return [];
    }
  }
  