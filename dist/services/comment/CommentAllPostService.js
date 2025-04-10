"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentAllPostService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CommentAllPostService {
    async execute({ post_id }) {
        if (!post_id || post_id.trim().length === 0) {
            throw new Error("ID do post inválido.");
        }
        const comments = await prisma_1.default.comment.findMany({
            where: {
                post_id: post_id,
                status: "Aprovado"
            },
            orderBy: {
                created_at: 'desc'
            },
            include: {
                parent: {
                    include: {
                        replies: {
                            include: {
                                parent: {
                                    include: {
                                        replies: {
                                            include: {
                                                parent: {
                                                    include: {
                                                        replies: {
                                                            include: {
                                                                parent: {
                                                                    include: {
                                                                        replies: {
                                                                            include: {
                                                                                parent: {
                                                                                    include: {
                                                                                        replies: {
                                                                                            include: {
                                                                                                parent: {
                                                                                                    include: {
                                                                                                        replies: {
                                                                                                            include: {
                                                                                                                parent: {
                                                                                                                    include: {
                                                                                                                        replies: {
                                                                                                                            include: {
                                                                                                                                parent: {
                                                                                                                                    include: {
                                                                                                                                        replies: true
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return comments;
    }
}
exports.CommentAllPostService = CommentAllPostService;
//# sourceMappingURL=CommentAllPostService.js.map