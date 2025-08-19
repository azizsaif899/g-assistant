import { CreateContentDto, UpdateContentDto, ContentQueryDto } from './dto/content.dto';
export declare class ContentService {
    private contents;
    create(createContentDto: CreateContentDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        status: string;
        title: string;
        content: string;
        type: "article" | "faq" | "documentation" | "tutorial";
        categories?: string[];
        tags?: string[];
        language?: string;
        authorId: string;
        id: string;
    }>;
    findAll(query: ContentQueryDto): Promise<{
        data: any[];
        total: number;
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, updateContentDto: UpdateContentDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
    publish(id: string): Promise<any>;
    search(query: string): Promise<{
        query: string;
        results: any[];
        total: number;
    }>;
    findByCategory(category: string): Promise<{
        category: string;
        results: any[];
        total: number;
    }>;
    findByTag(tag: string): Promise<{
        tag: string;
        results: any[];
        total: number;
    }>;
}
